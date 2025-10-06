# Development Setup Guide

## 📋 Prerequisites

- Node.js 16+ (for development tools)
- Git
- Modern web browser
- Code editor (VS Code recommended)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/ZiadEzzaidi/Portfolio.git
   cd Portfolio
   ```

2. **Install development dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run serve
   # OR
   http-server -p 8000
   # OR
   start index.html
   ```

4. **Open in browser**
   - Navigate to `http://localhost:8000`
   - Or open `index.html` directly

## 🛠️ Development Commands

```bash
# Lint all files
npm run lint

# Format code
npm run format

# Validate project
npm run validate

# Build for production
npm run build
```

## 📁 Project Structure

```
portfolio/
├── assets/              # Static assets
│   ├── favicons/       # Favicon files
│   └── site.webmanifest
├── config/             # Development configuration
│   ├── .htmlhintrc
│   ├── .stylelintrc.json
│   ├── .jshintrc
│   └── .prettierrc
├── css/                # Stylesheets
├── deployment/         # AWS deployment files
├── docs/              # Documentation
├── images/            # Image assets
├── js/                # JavaScript files
└── .github/           # CI/CD workflows
```

## 🔧 Configuration Files

- **config/.htmlhintrc** - HTML validation rules
- **config/.stylelintrc.json** - CSS linting configuration
- **config/.jshintrc** - JavaScript validation rules
- **config/.prettierrc** - Code formatting configuration

## 📝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run validate` to check code quality
4. Commit and push changes
5. Create a pull request

## 🚀 Deployment

The project automatically deploys to AWS S3 when changes are pushed to the main branch.

Manual deployment:
```bash
aws s3 sync . s3://ziad-portfolio --exclude ".git/*" --exclude "node_modules/*" --delete
```