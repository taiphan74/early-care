@AGENTS.md

## Project Context

- **Project**: Website bảo hiểm sức khỏe cá nhân "Early Care" (tiếng Việt)
- **Brand colors**: `--brand-primary: #0C3BAA`, `--brand-secondary: #3B82F6` — dùng `var(--brand-primary)` thay vì hardcoded hex
- **CTA**: "TƯ VẤN NGAY" — dùng `motion.button` với `whileHover/whileTap` spring animation (scale 1.05/0.95)

## Stack & Conventions

- `globals.css` — Tailwind v4 dùng `@theme inline`, không có `tailwind.config.*`
- `components/ui/` — shadcn/ui v4 (button, navigation-menu, sheet, etc.)
- NavigationMenu dropdown: dùng `left-1/2 -translate-x-1/2` để căn giữa theo trigger
- Font: Geist (`next/font/google`), `lang="vi"`
- `public/images/` — logo.png và hình ảnh khác
- Header: `sticky top-0` với `backdrop-blur-sm`

## Navigation

- Giới thiệu, Sản phẩm (dropdown), Liên hệ — tất cả là `<span>` không navigate trong dev
- Mobile: Sheet slide từ phải, có accordion submenu cho Sản phẩm

## Commit Rule

**Chỉ commit git khi người dùng yêu cầu tường minh.** Không tự động commit dù task đã hoàn thành. Khi hoàn xong, thông báo sẵn sàng và đợi user nói "commit đi".

## Framer Motion

- Components dùng `motion.*` phải có `"use client"` ở đầu file
- Khi dùng `ease` trong variants: dùng `[0.25, 0.1, 0.25, 1] as const` thay vì `"easeOut"` string để tránh TypeScript lỗi

## Animation Patterns

- Stagger list items: container với `staggerChildren: 0.15` trong `show.transition`
- fadeUpDelayed(delay): animation factory cho từng element với delay riêng

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
