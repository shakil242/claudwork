# CLAUDE.md - AI Assistant Guide

**Last Updated:** 2025-11-23
**Repository:** claudwork
**Status:** New/Initial Setup

## 📋 Overview

This repository is currently in its initial state. This document serves as a guide for AI assistants (particularly Claude) to understand the codebase structure, development workflows, and conventions to follow when working on this project.

## 🏗️ Repository Structure

```
claudwork/
├── .git/               # Git version control
├── README.md           # Project overview
└── CLAUDE.md           # This file - AI assistant guide
```

### Current State
- **Type:** Not yet determined (awaiting initial development)
- **Framework:** None configured yet
- **Language(s):** To be determined
- **Package Manager:** Not configured
- **Build System:** Not configured

## 🔄 Development Workflows

### Git Workflow

**Branch Strategy:**
- Feature branches follow the pattern: `claude/claude-md-{identifier}`
- Current working branch: `claude/claude-md-mibxrhe9duuzrg8n-01QM9A6ojWAG4ZznA5r1B2hA`
- Always develop on the designated Claude branch
- Never push directly to main/master without explicit permission

**Commit Guidelines:**
- Write clear, descriptive commit messages
- Focus on "why" rather than "what" in commit descriptions
- Keep commits atomic and focused on single changes
- Follow conventional commit format when applicable:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `refactor:` for code refactoring
  - `test:` for adding tests
  - `chore:` for maintenance tasks

**Push Protocol:**
```bash
# Always use -u flag for first push
git push -u origin <branch-name>

# Retry on network failures with exponential backoff:
# 2s, 4s, 8s, 16s (up to 4 retries)
```

### Code Review Process
- Create pull requests with clear descriptions
- Include "Summary" section with bullet points
- Include "Test plan" section with testing checklist
- Reference related issues when applicable

## 🎯 Key Conventions for AI Assistants

### General Principles

1. **Read Before Modifying**
   - ALWAYS read files before proposing changes
   - Understand existing patterns before adding new code
   - Never assume file contents

2. **Minimal Changes**
   - Only make changes that are directly requested
   - Avoid over-engineering solutions
   - Don't add "nice-to-have" features without explicit request
   - Keep it simple and focused

3. **Security First**
   - Watch for OWASP Top 10 vulnerabilities:
     - Command injection
     - XSS (Cross-Site Scripting)
     - SQL injection
     - Insecure authentication
     - Sensitive data exposure
   - Fix security issues immediately when discovered
   - Validate at system boundaries (user input, external APIs)

4. **No Backwards-Compatibility Hacks**
   - Delete unused code completely
   - Don't rename variables with `_` prefix just to avoid "unused" warnings
   - Don't add `// removed` comments
   - Clean refactoring over compatibility shims

### Code Quality

**DO:**
- Write self-documenting code with clear variable/function names
- Add comments only where logic isn't self-evident
- Use type annotations in typed languages
- Follow existing code style and patterns
- Keep functions small and focused
- Use meaningful error messages

**DON'T:**
- Add docstrings to code you didn't change
- Create abstractions for one-time operations
- Add error handling for impossible scenarios
- Over-engineer for hypothetical future requirements
- Add features beyond the current task
- Use feature flags without clear need

### File Operations

**Prefer Specialized Tools:**
- Use `Read` tool instead of `cat/head/tail`
- Use `Edit` tool instead of `sed/awk`
- Use `Write` tool instead of `echo >` or heredoc
- Use `Grep` tool instead of `grep` command
- Use `Glob` tool instead of `find` command

**Reserve Bash for:**
- Git operations
- Package manager commands (npm, pip, cargo, etc.)
- Build system commands
- Docker operations
- Actual terminal operations requiring shell execution

### Task Management

**Using TodoWrite:**
- Use for complex multi-step tasks (3+ steps)
- Use when user provides multiple tasks
- DON'T use for single, trivial tasks
- Update task status in real-time
- Mark tasks complete immediately after finishing
- Keep exactly ONE task as `in_progress` at a time

**Task States:**
- `pending`: Not yet started
- `in_progress`: Currently working on
- `completed`: Successfully finished

**Task Format:**
- `content`: Imperative form ("Run tests")
- `activeForm`: Present continuous ("Running tests")

### Communication Style

- Be concise and technical
- Avoid emojis unless explicitly requested
- Use GitHub-flavored markdown
- Output text directly (not via bash echo)
- Focus on facts over praise
- Provide objective technical guidance
- Disagree respectfully when necessary

### Code References

When referencing code, use the pattern: `file_path:line_number`

Example: "The error handling is in `src/utils/errors.ts:42`"

## 📦 Project Setup (To Be Configured)

### Installation
```bash
# To be added when project structure is established
```

### Running the Project
```bash
# To be added when project structure is established
```

### Testing
```bash
# To be added when project structure is established
```

### Building
```bash
# To be added when project structure is established
```

## 🔍 Common Patterns

*This section will be populated as the codebase develops and patterns emerge.*

### Architecture Patterns
- To be documented

### Naming Conventions
- To be documented

### Error Handling
- To be documented

### Testing Patterns
- To be documented

## 🚨 Common Pitfalls to Avoid

1. **Don't assume file existence** - Always check before reading
2. **Don't batch git operations** - Handle commits atomically
3. **Don't skip reading existing code** - Understand before modifying
4. **Don't add unnecessary abstractions** - YAGNI (You Aren't Gonna Need It)
5. **Don't ignore error messages** - Read and understand failures
6. **Don't force push** - Especially not to main/master
7. **Don't skip pre-commit hooks** - Unless explicitly requested
8. **Don't commit secrets** - Check for .env, credentials, API keys
9. **Don't use interactive git commands** - No `git rebase -i` or `git add -i`
10. **Don't create markdown files proactively** - Only when requested

## 📚 Resources and Documentation

### Internal Documentation
- README.md - Project overview and getting started guide

### External Resources
- [Git Documentation](https://git-scm.com/doc)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

## 🔄 Updating This Document

This document should be updated when:
- New frameworks or languages are added
- Development workflows change
- New patterns emerge in the codebase
- Build/test/deployment processes are established
- Team conventions are adopted
- Architectural decisions are made

**How to Update:**
1. Read the current CLAUDE.md
2. Make targeted updates to relevant sections
3. Update the "Last Updated" date at the top
4. Commit with message: `docs: update CLAUDE.md - [brief description]`

## ✅ Pre-Commit Checklist

Before committing, verify:
- [ ] Code follows existing patterns
- [ ] No security vulnerabilities introduced
- [ ] No secrets or sensitive data included
- [ ] Only necessary changes made (no over-engineering)
- [ ] Tests pass (when applicable)
- [ ] Build succeeds (when applicable)
- [ ] Commit message is clear and descriptive
- [ ] Changes match the original request

## 🎓 Learning from This Codebase

As an AI assistant working on this project:
1. Study existing code before suggesting changes
2. Learn patterns by reading multiple files
3. Understand the project's goals and constraints
4. Ask clarifying questions when requirements are ambiguous
5. Adapt to the project's established conventions
6. Suggest improvements only when clearly beneficial
7. Document new patterns as they emerge

---

**Note for AI Assistants:** This is a living document. As the codebase evolves, update this guide to reflect new patterns, conventions, and workflows. Keep it concise but comprehensive.
