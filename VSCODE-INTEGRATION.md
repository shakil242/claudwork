# Visual Studio Code Integration Guide

This guide will help you set up Visual Studio Code for optimal development of the Shopify Cart Upsell project.

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/) installed
- Node.js and npm (optional, for ESLint and Prettier CLI usage)

## Quick Start

1. Open this project in VS Code:
   ```bash
   code /home/user/claudwork
   ```

2. Install recommended extensions (VS Code will prompt you automatically)

3. Start developing with full IntelliSense, linting, and formatting support!

## Configuration Files

This project includes the following configuration files:

### VS Code Specific

- **`.vscode/settings.json`** - Project-specific editor settings
- **`.vscode/extensions.json`** - Recommended extensions
- **`.vscode/launch.json`** - Debug configurations

### Cross-Editor

- **`.editorconfig`** - Consistent coding styles across different editors
- **`.eslintrc.json`** - JavaScript linting rules
- **`.prettierrc`** - Code formatting rules
- **`jsconfig.json`** - JavaScript IntelliSense configuration

## Recommended Extensions

When you open this project, VS Code will recommend installing the following extensions:

### Essential Extensions

1. **Shopify Theme Check** (`shopify.theme-check-vscode`)
   - Liquid file syntax highlighting and validation
   - Shopify theme development support

2. **ESLint** (`dbaeumer.vscode-eslint`)
   - JavaScript code quality and error checking
   - Auto-fix on save

3. **Prettier** (`esbenp.prettier-vscode`)
   - Code formatting for JS, HTML, CSS
   - Format on save enabled

### Helpful Extensions

4. **GitLens** (`eamodio.gitlens`)
   - Advanced Git integration
   - Blame annotations, commit history, etc.

5. **Live Server** (`ritwickdey.liveserver`)
   - Launch a local development server
   - Live reload for HTML/CSS changes

6. **Path IntelliSense** (`christian-kohler.path-intellisense`)
   - Autocomplete file paths

7. **Auto Rename Tag** (`formulahendry.auto-rename-tag`)
   - Automatically rename paired HTML tags

## Features

### 1. Auto-Formatting

Code will automatically format when you save (enabled for JS, HTML, CSS, Liquid files).

**Manual formatting:**
- Windows/Linux: `Ctrl + Shift + F`
- Mac: `Cmd + Shift + F`

### 2. Linting

ESLint will automatically check your JavaScript code for errors and style issues.

**View problems:**
- Open the Problems panel: `Ctrl + Shift + M` (Windows/Linux) or `Cmd + Shift + M` (Mac)

### 3. IntelliSense

Smart code completion for:
- JavaScript APIs
- DOM APIs
- jQuery
- Shopify objects

### 4. Debugging

Multiple debug configurations are available:

#### Debug Checkout Page
1. Install Live Server extension
2. Right-click `checkout-page-fixed.html` and select "Open with Live Server"
3. Press `F5` or go to Run > Start Debugging
4. Select "Launch Chrome - Checkout Page"

#### Debug Current HTML File
1. Open any HTML file
2. Press `F5`
3. Select "Launch Chrome - Current File"

### 5. Git Integration

Built-in Git support with enhanced features from GitLens:
- View commit history
- Blame annotations
- Compare changes
- Stash management

## Code Quality Rules

### JavaScript Standards

- **Indentation**: 2 spaces
- **Quotes**: Single quotes (configurable)
- **Semicolons**: Required
- **Line breaks**: Unix (LF)
- **ES6+**: Modern JavaScript features enabled

### File Formatting

All files are configured with:
- UTF-8 encoding
- Trim trailing whitespace
- Insert final newline
- LF line endings

## Keyboard Shortcuts

### Essential Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Command Palette | `Ctrl + Shift + P` | `Cmd + Shift + P` |
| Quick Open File | `Ctrl + P` | `Cmd + P` |
| Format Document | `Ctrl + Shift + F` | `Cmd + Shift + F` |
| Go to Definition | `F12` | `F12` |
| Find References | `Shift + F12` | `Shift + F12` |
| Toggle Terminal | ``Ctrl + ` `` | ``Cmd + ` `` |
| Problems Panel | `Ctrl + Shift + M` | `Cmd + Shift + M` |

## Project Structure for VS Code

```
claudwork/
├── .vscode/                    # VS Code configuration
│   ├── settings.json           # Editor settings
│   ├── extensions.json         # Recommended extensions
│   └── launch.json             # Debug configurations
├── .editorconfig               # Cross-editor settings
├── .eslintrc.json              # JavaScript linting rules
├── .prettierrc                 # Code formatting rules
├── jsconfig.json               # JavaScript IntelliSense
├── cart-upsell.js              # Main JavaScript file
├── cart-upsell.css             # Styles
├── cart-upsell.liquid          # Shopify template
└── checkout-page-fixed.html    # Checkout page
```

## Troubleshooting

### Extensions Not Installing

If recommended extensions don't install automatically:

1. Open Command Palette (`Ctrl + Shift + P` / `Cmd + Shift + P`)
2. Type "Extensions: Show Recommended Extensions"
3. Install extensions manually

### Formatting Not Working

1. Check that Prettier extension is installed
2. Verify default formatter in settings:
   - Open Command Palette
   - Type "Preferences: Open Settings (JSON)"
   - Ensure `"editor.defaultFormatter": "esbenp.prettier-vscode"` is set

### ESLint Not Running

1. Install ESLint extension
2. Reload VS Code window:
   - Command Palette > "Developer: Reload Window"

### Liquid Files Not Highlighting

1. Install Shopify Theme Check extension
2. Check file association in `.vscode/settings.json`:
   ```json
   "files.associations": {
     "*.liquid": "liquid"
   }
   ```

## Optional: Install ESLint and Prettier Globally

For command-line usage:

```bash
npm install -g eslint prettier
```

Then you can run:

```bash
# Lint JavaScript files
eslint *.js

# Format all files
prettier --write "**/*.{js,html,css,liquid}"
```

## Additional Resources

- [VS Code Documentation](https://code.visualstudio.com/docs)
- [Shopify Liquid Documentation](https://shopify.dev/docs/themes/liquid)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

## Tips for Shopify Development

1. **Use Liquid snippets**: Create reusable components in `.liquid` files
2. **Test in multiple browsers**: Use the debug configurations
3. **Version control**: Commit often with clear messages
4. **Code review**: Use GitLens to review changes before committing

## Getting Help

If you encounter issues:

1. Check the Output panel (View > Output) and select the relevant extension
2. Check the Problems panel (`Ctrl + Shift + M` / `Cmd + Shift + M`)
3. Consult extension documentation

Happy coding!
