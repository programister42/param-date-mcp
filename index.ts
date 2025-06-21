#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import {
  format,
  formatDistanceToNowStrict,
  formatDistanceStrict,
  formatISO,
} from "date-fns";
import packageJson from "./package.json" with { type: "json" };

const wrapForMcp = (callback: () => string): CallToolResult => {
  try {
    const result = callback();
    return {
      content: [{ type: "text" as const, text: result }],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${
            error instanceof Error ? error.message : String(error)
          }`,
        },
      ],
      isError: true,
    };
  }
};

const server = new McpServer({
  name: packageJson.name,
  version: packageJson.version,
});

server.registerTool(
  "get-current-datetime",
  {
    title: "Get Current Date and Time",
    description: "Returns the current date and time in ISO format",
    inputSchema: {},
  },
  () =>
    wrapForMcp(() => {
      const now = new Date();
      return formatISO(now);
    })
);

server.registerTool(
  "format-date",
  {
    title: "Format Date",
    description:
      "Format a date using date-fns format function with a custom format string",
    inputSchema: {
      date: z
        .string()
        .describe("Date in ISO format (e.g., '2024-01-15T10:30:00Z')"),
      formatString: z
        .string()
        .describe(
          "Format string in ISO format (e.g., 'yyyy-MM-dd HH:mm:ss', 'PPP', 'p')"
        ),
    },
  },
  ({ date, formatString }) =>
    wrapForMcp(() => {
      const dateObj = new Date(date);
      return format(dateObj, formatString);
    })
);

server.registerTool(
  "format-distance-to-now-strict",
  {
    title: "Format Distance to Now (Strict)",
    description:
      "Calculate the strict distance from a given date to now using formatDistanceToNowStrict",
    inputSchema: {
      date: z
        .string()
        .describe("Date in ISO format (e.g., '2024-01-15T10:30:00Z')"),
    },
  },
  ({ date }) =>
    wrapForMcp(() => {
      const dateObj = new Date(date);
      return formatDistanceToNowStrict(dateObj, { addSuffix: true });
    })
);

server.registerTool(
  "format-distance-strict",
  {
    title: "Format Distance Between Dates (Strict)",
    description:
      "Calculate the strict distance between two dates using formatDistanceStrict",
    inputSchema: {
      fromDate: z
        .string()
        .describe("Start date in ISO format (e.g., '2024-01-15T10:30:00Z')"),
      toDate: z
        .string()
        .describe("End date in ISO format (e.g., '2024-01-16T10:30:00Z')"),
    },
  },
  ({ fromDate, toDate }) =>
    wrapForMcp(() => {
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);
      return formatDistanceStrict(fromDateObj, toDateObj);
    })
);

server.registerTool(
  "format-iso",
  {
    title: "Format Date to ISO",
    description: "Format a date to ISO string using formatISO",
    inputSchema: {
      date: z
        .string()
        .describe("Date in ISO format (e.g., '2024-01-15T10:30:00Z')"),
    },
  },
  ({ date }) =>
    wrapForMcp(() => {
      const dateObj = new Date(date);
      return formatISO(dateObj);
    })
);

server.registerResource(
  "current-time",
  "datetime://current",
  {
    title: "Current Date and Time",
    description: "Current date and time in various formats",
    mimeType: "application/json",
  },
  async () => {
    const now = new Date();
    const timeInfo = {
      iso: formatISO(now),
      isoDate: formatISO(now, { representation: "date" }),
      isoTime: formatISO(now, { representation: "time" }),
      formatted: {
        full: format(now, "PPPPpppp"),
        date: format(now, "PPPP"),
        time: format(now, "pppp"),
        short: format(now, "Pp"),
      },
      timestamp: now.getTime(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    return {
      contents: [
        {
          uri: "datetime://current",
          text: JSON.stringify(timeInfo, null, 2),
          mimeType: "application/json",
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);

console.error("Date MCP Server started. Available tools:");
console.error(
  "- get-current-datetime: Get current date and time in ISO format"
);
console.error("- format-date: Format a date with custom format string");
console.error(
  "- format-distance-to-now-strict: Calculate strict distance from date to now"
);
console.error(
  "- format-distance-strict: Calculate strict distance between two dates"
);
console.error("- format-iso: Format date to ISO string with options");
console.error("- Resource: datetime://current - Current time information");
