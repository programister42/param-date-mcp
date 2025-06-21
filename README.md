# 📅 ParamDate MCP Server

> A powerful Model Context Protocol (MCP) server that brings comprehensive date and time functionality to your AI assistant using the battle-tested [date-fns](https://date-fns.org/) library.

## 🚀 Quick Start

### Installation

Look up how to install MCP servers from the npm registry for your favorite AI tool (Claude Desktop, Cursor, etc.).

Package name: `param-date-mcp`

## 🎯 What This Server Does

This MCP server gives your AI assistant superpowers for working with dates and times. Instead of the AI guessing or making mistakes with date calculations, it can use these precise tools to:

- ✅ Get the current date and time
- ✅ Format dates in any style you want
- ✅ Calculate time differences accurately
- ✅ Convert between different date formats
- ✅ Access comprehensive time zone information

## 🤖 AI Agent Configuration

To make your AI assistant automatically use this date server, add this rule to your AI tool:

```markdown
When working with dates, times, or temporal calculations, always use the param-date-mcp MCP Server tools:

- `get-current-datetime`: Get current time in ISO format
- `format-date`: Format dates with custom patterns (use date-fns format strings)
- `format-distance-to-now-strict`: Calculate "X ago" or "in X" from a date to now
- `format-distance-strict`: Calculate time between two specific dates
- `format-iso`: Convert any date to ISO format
- `datetime://current` resource: Access comprehensive current time data

Always prefer these tools over manual date calculations.
```

## 🛠️ Available Tools

### 1. `get-current-datetime`

**What it does**: Gets the current date and time in ISO format

**Example**:

```json
{
  "name": "get-current-datetime",
  "arguments": {}
}
```

**Returns**: `"2024-01-15T10:30:00.000Z"`

---

### 2. `format-date`

**What it does**: Formats any date using custom format strings

**Example**:

```json
{
  "name": "format-date",
  "arguments": {
    "date": "2024-01-15T10:30:00Z",
    "formatString": "MMMM do, yyyy 'at' h:mm a"
  }
}
```

**Returns**: `"January 15th, 2024 at 10:30 AM"`

**Popular format patterns**:

- `yyyy-MM-dd` → `2024-01-15`
- `MMM dd, yyyy` → `Jan 15, 2024`
- `EEEE, MMMM do` → `Monday, January 15th`
- `h:mm a` → `10:30 AM`
- `HH:mm:ss` → `10:30:00`

---

### 3. `format-distance-to-now-strict`

**What it does**: Calculates how much time has passed since a given date

**Example**:

```json
{
  "name": "format-distance-to-now-strict",
  "arguments": {
    "date": "2024-01-10T10:30:00Z"
  }
}
```

**Returns**: `"5 days ago"` (automatically adds "ago" or "in" suffix)

---

### 4. `format-distance-strict`

**What it does**: Calculates the time difference between two specific dates

**Example**:

```json
{
  "name": "format-distance-strict",
  "arguments": {
    "fromDate": "2024-01-15T10:30:00Z",
    "toDate": "2024-01-16T14:45:00Z"
  }
}
```

**Returns**: `"1 day"`

---

### 5. `format-iso`

**What it does**: Converts any date to ISO format (standardized format)

**Example**:

```json
{
  "name": "format-iso",
  "arguments": {
    "date": "January 15, 2024 10:30 AM"
  }
}
```

**Returns**: `"2024-01-15T10:30:00.000Z"`

## 📊 Available Resource

### `datetime://current`

**What it provides**: Comprehensive current time information in multiple formats

**Access**: Simply reference `datetime://current` in your AI conversation

**Returns**:

```json
{
  "iso": "2024-01-15T10:30:00.000Z",
  "isoDate": "2024-01-15",
  "isoTime": "10:30:00.000Z",
  "formatted": {
    "full": "Monday, January 15th, 2024 at 10:30:00 AM GMT",
    "date": "Monday, January 15th, 2024",
    "time": "10:30:00 AM GMT",
    "short": "1/15/2024, 10:30 AM"
  },
  "timestamp": 1705316200000,
  "timezone": "America/New_York"
}
```

## 🛡️ Error Handling

All tools include robust error handling:

- ✅ Invalid date formats are caught and explained
- ✅ Malformed format strings return helpful error messages
- ✅ All errors include the `isError: true` flag for easy detection
- ✅ Descriptive error messages help you fix issues quickly

## 📚 Format String Reference

This server uses [date-fns format tokens](https://date-fns.org/docs/format). Here are the most useful ones:

| Token  | Example      | Description         |
| ------ | ------------ | ------------------- |
| `yyyy` | 2024         | 4-digit year        |
| `MM`   | 01           | 2-digit month       |
| `MMM`  | Jan          | Short month name    |
| `MMMM` | January      | Full month name     |
| `dd`   | 15           | 2-digit day         |
| `do`   | 15th         | Day with ordinal    |
| `EEEE` | Monday       | Full day name       |
| `HH`   | 10           | 24-hour format hour |
| `h`    | 10           | 12-hour format hour |
| `mm`   | 30           | Minutes             |
| `ss`   | 00           | Seconds             |
| `a`    | AM           | AM/PM               |
| `PPP`  | Jan 15, 2024 | Localized date      |
| `p`    | 10:30 AM     | Localized time      |

## 🏗️ Technical Details

Built with:

- **[Bun](https://bun.sh/)**: Ultra-fast JavaScript runtime
- **[Model Context Protocol](https://modelcontextprotocol.io/)**: Standardized AI tool integration
- **[MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)**: Official TypeScript SDK for MCP
- **[date-fns](https://date-fns.org/)**: Modern, lightweight date utility library
- **[Zod](https://zod.dev/)**: TypeScript-first schema validation
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe development

## 🔧 Development Setup

For contributing or customizing the server:

### Prerequisites

- [Bun](https://bun.sh/) installed on your system
- Basic familiarity with command line

### Installation & Setup

1. **Clone and install**:

```bash
git clone <your-repo-url>
cd param-date-mcp
bun install
```

2. **Start the server**:

```bash
bun run start
```

3. **For development** (with hot reload):

```bash
bun run dev
```

## 📄 License

MIT License - feel free to use this in your projects!

---

**Made with ❤️ for the MCP community**
