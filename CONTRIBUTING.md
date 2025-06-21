# Contributing to param-date-mcp

## Release Process

This project uses automated releases based on [Conventional Commits](https://www.conventionalcommits.org/).

### Commit Message Format

We follow the Conventional Commits specification. Each commit message should be structured as:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types

- **feat**: A new feature (triggers minor version bump)
- **fix**: A bug fix (triggers patch version bump)
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

#### Breaking Changes

- Add `BREAKING CHANGE:` in the footer or add `!` after the type (triggers major version bump)
- Example: `feat!: remove deprecated API`

### Release Automation

1. **Automatic releases**: Triggered on every push to `main` branch
2. **Manual releases**: Can be triggered via GitHub Actions UI
3. **What gets automated**:
   - Version bumping based on commit types
   - Changelog generation
   - GitHub release creation
   - npm package publishing (if NPM_TOKEN is configured)
   - Git tagging

### Examples

```bash
# Patch release (1.0.1 -> 1.0.2)
git commit -m "fix: resolve date parsing edge case"

# Minor release (1.0.1 -> 1.1.0)
git commit -m "feat: add new time zone conversion tool"

# Major release (1.0.1 -> 2.0.0)
git commit -m "feat!: change MCP server API structure

BREAKING CHANGE: The tool registration format has changed"
```

### Development Workflow

1. Create feature branch from `main`
2. Make changes following conventional commits
3. Create PR to `main`
4. Once merged, automatic release will trigger
5. New version will be published automatically

### Testing

Before releasing, ensure:

- `bun run test` passes (type checking)
- `bun run start` successfully starts the MCP server
- All MCP tools are functional
