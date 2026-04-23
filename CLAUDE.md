@AGENTS.md

## Project Context

- **Project**: Website bảo hiểm sức khỏe cá nhân "Early Care" (tiếng Việt)
- **Brand colors**: `--brand-primary: #0C3BAA`, `--brand-secondary: #3B82F6` — dùng `var(--brand-primary)` thay vì hardcoded hex
- **CTA**: "TƯ VẤN NGAY" — dùng `variant="consult"` trong shadcn Button (custom variant với gradient + shadow)

## Stack & Conventions

- `globals.css` — Tailwind v4 dùng `@theme inline`, không có `tailwind.config.*`
- `components/ui/` — shadcn/ui v4 (button, navigation-menu, sheet, etc.)
- Font: Geist (`next/font/google`), `lang="vi"`
- `public/images/` — logo.png và hình ảnh khác
- Header: `sticky top-0` với `backdrop-blur-sm`

## Navigation

- Giới thiệu, Sản phẩm (dropdown), Blog (dropdown), Liên hệ
- Mobile: Sheet slide từ phải, có accordion submenu

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
