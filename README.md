# DomQuery

> Complete all features needed for web app development in one unified ecosystem

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.2-blue.svg)](https://github.com/domquery-com/domquery)

**DomQuery** is a modern JavaScript library that integrates all features needed for web app development.  
It is especially optimized for hybrid app/WebView environments.

## ✨ Key Features

- 🚀 **Powerful Features**: Advanced custom selectors, native Promise, 30+ easing functions
- 📱 **Hybrid App Specialized**: Automatic WebView Bridge support, perfect file:// URL handling
- 🎨 **Mobile UX Patterns**: Alert, Select, Pulling and other mobile-optimized UI
- 🔗 **Unified Ecosystem**: DOM manipulation, Ajax, Animation, History and all-in-one solution
- ⚡ **Modern API**: Native Promise, async/await support

## 📊 DomQuery's Key Characteristics

| Feature | Description |
|---------|-------------|
| Custom Selectors | **Rich** (text=, depth=, sibling[] etc.) |
| Promise | **Native Promise** support |
| Animation | **Advanced** (30+ easing functions) |
| WebView Bridge | **Automatic support** |
| History Management | **Built-in** |
| Mobile UX | **Built-in** (Alert, Select, Pulling etc.) |

## 🚀 Quick Start

### Installation

Install using the following commands in terminal (command line):

#### npm (Node Package Manager)
```bash
# Basic installation (local)
npm install domquery-com

# Install specific version
npm install domquery-com@1.0.2

# Install as dev dependency
npm install domquery-com --save-dev

# Global installation (not recommended)
npm install -g domquery-com
```

#### yarn
```bash
# Basic installation
yarn add domquery-com

# Install specific version
yarn add domquery-com@1.0.2

# Install as dev dependency
yarn add domquery-com --dev
```

#### pnpm
```bash
# Basic installation
pnpm add domquery-com

# Install specific version
pnpm add domquery-com@1.0.2

# Install as dev dependency
pnpm add -D domquery-com
```

#### Verify Installation
```bash
# Check installed version
npm list domquery-com

# or
npm info domquery-com version
```

> **Note**: npm installs the entire package (original + minified).  
> However, you can choose which version (original or minified) to use in your code.

### Usage in Node.js / Bundlers

#### Choosing Original vs Minified

When installing via npm, both original and minified versions are installed, but you can choose which version to use in your code:

**Original (Development - Easy debugging)**
```javascript
const $ = require('domquery-com');
// or
import $ from 'domquery-com';
```

**Minified (Production - Minimized file size)**
```javascript
const $ = require('domquery-com/min');
// or
import $ from 'domquery-com/minified';
```

**Bundle Configuration (Webpack, Vite, etc.)**

When using a bundler, you can configure it to include only the minified version in production builds:

```javascript
// webpack.config.js Example
module.exports = {
  resolve: {
    alias: {
      'domquery-com': process.env.NODE_ENV === 'production' 
        ? 'domquery-com/min' 
        : 'domquery-com'
    }
  }
};
```

#### CommonJS (require)
```javascript
// Original version (default)
const $ = require('domquery-com');

// Minified version
const $ = require('domquery-com/min');
```

#### ES Modules (import)
```javascript
// Original version (default)
import $ from 'domquery-com';

// Minified version
import $ from 'domquery-com/minified';
```

#### Browser (HTML)
```html
<!-- When installed via npm, use directly from node_modules -->
<script src="./node_modules/domquery-com/domquery.js"></script>
<script src="./node_modules/domquery-com/domquery.min.js"></script>
```

### CDN Usage (Without npm installation)

When a package is registered on npm, **CDN is automatically provided**. You can use it immediately without npm installation.

```html
<!-- npm-based CDN (automatically provided) - Recommended -->
<!-- Original version (Development) -->
<script src="https://cdn.jsdelivr.net/npm/domquery-com@1.0.2/domquery.js"></script>
<!-- or -->
<script src="https://unpkg.com/domquery-com@1.0.2/domquery.js"></script>

<!-- Minified version (Production recommended) -->
<script src="https://cdn.jsdelivr.net/npm/domquery-com@1.0.2/domquery.min.js"></script>
<!-- or -->
<script src="https://unpkg.com/domquery-com@1.0.2/domquery.min.js"></script>

<!-- Latest version (version number can be omitted) -->
<script src="https://unpkg.com/domquery-com/domquery.min.js"></script>
```

> **Note**: 
> - **npm-based CDN** is automatically provided when a package is registered on npm.
> - Both `unpkg` and `jsdelivr` are free CDN services.
> - It is recommended to specify a specific version (`@1.0.2`) in production.
> - The `unpkg` and `jsdelivr` fields in `package.json` automatically point to the minified version.

#### Loading Additional Modules (추가 모듈 로드)

If you need to load additional modules separately, you can access them via CDN:

```html
<!-- Main library (메인 라이브러리) -->
<script src="https://unpkg.com/domquery-com@1.0.2/domquery.min.js"></script>

<!-- Additional modules (추가 모듈) -->
<script src="https://unpkg.com/domquery-com@1.0.2/src_min/alert.min.js"></script>
<script src="https://unpkg.com/domquery-com@1.0.2/src_min/ajax.min.js"></script>
<script src="https://unpkg.com/domquery-com@1.0.2/src_min/select.min.js"></script>
<script src="https://unpkg.com/domquery-com@1.0.2/src_min/animate.min.js"></script>
<!-- etc... -->

<!-- Or using jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/domquery-com@1.0.2/src_min/alert.min.js"></script>
```

> **Note**: All files included in the `files` field of `package.json` are accessible via CDN.  
> (`package.json`의 `files` 필드에 포함된 모든 파일은 CDN을 통해 접근 가능합니다.)

### Usage Examples

```javascript
// DOM manipulation
$('.my-element').addClass('active').css('color', 'red');

// Ajax (Promise-based)
const data = await $.ajax({
    url: '/api/data',
    method: 'GET'
});

// Alert (Mobile-optimized)
$alert('Hello World!', {
    radius: '15px',
    background: '#68717e'
});
```

## 📖 Documentation

- [Official Documentation](https://domquery.com)
- [Introduction](https://domquery.com/?introduction)
- [API Reference](https://domquery.com)
- [Examples](https://domquery.com)

## 🎯 Use Cases

- Hybrid app development (Android/iOS WebView)
- Mobile web apps
- SPA (Single Page Application)
- file:// URL-based apps

## 📦 File Structure

```
DomQuery/
├── domquery.js          # Core library
├── src/
│   ├── ajax.js         # Ajax module
│   ├── alert.js        # Alert module
│   ├── select.js       # Select module
│   ├── animate.js      # Animation module
│   ├── lazyLoadImages.js # LazyLoad module
│   ├── pulling.js      # Pulling module
│   ├── AES.js          # Encryption utility
│   └── SHA256.js       # Hash utility
└── docs/               # Documentation
```

## 🤝 Contributing

Contributions are welcome! Please participate through Issues and Pull Requests.

- [Contributing Guidelines](https://github.com/domquery-com/domquery/blob/main/CONTRIBUTING.md)
- [Code of Conduct](https://github.com/domquery-com/domquery/blob/main/CODE_OF_CONDUCT.md)

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 👥 Developers

- **Byeonghee Gong** - bankcgi@naver.com
- **Taeyoon Gong** - domquery.com@gmail.com

## 🔗 Links

- [Official Website](https://domquery.com)
- [Documentation](https://domquery.com/?introduction)
- [GitHub Issues](https://github.com/domquery-com/domquery/issues)
- [GitHub Discussions](https://github.com/domquery-com/domquery/discussions)

---

⭐ If this project helped you, please give it a Star!
