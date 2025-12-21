# DomQuery

> 웹앱 개발에 필요한 모든 기능을 하나의 통합 생태계로 제공합니다

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/domquery-com/domquery)

**DomQuery**는 웹앱 개발에 필요한 모든 기능을 통합한 현대적인 JavaScript 라이브러리입니다.  
하이브리드 앱/WebView 환경에 특화되어 있습니다.

## ✨ 주요 기능

- 🚀 **강력한 기능**: 고급 커스텀 선택자, 네이티브 Promise, 30개 이상의 이징 함수
- 📱 **하이브리드 앱 특화**: 자동 WebView Bridge 지원, 완벽한 file:// URL 처리
- 🎨 **모바일 UX 패턴**: Alert, Select, Pulling 등 모바일 최적화 UI
- 🔗 **통합 생태계**: DOM 조작, Ajax, Animation, History 등 올인원 솔루션
- ⚡ **현대적 API**: 네이티브 Promise, async/await 지원

## 📊 주요 특징

| 기능 | 설명 |
|---------|-------------|
| 커스텀 선택자 | **풍부함** (text=, depth=, sibling[] 등) |
| Promise | **네이티브 Promise** 지원 |
| 애니메이션 | **고급** (30개 이상의 이징 함수) |
| WebView Bridge | **자동 지원** |
| 히스토리 관리 | **내장** |
| 모바일 UX | **내장** (Alert, Select, Pulling 등) |

## 🚀 빠른 시작

### 설치

터미널(명령줄)에서 다음 명령어로 설치할 수 있습니다:

#### npm (Node Package Manager)
```bash
# 기본 설치 (로컬)
npm install domquery-com

# 특정 버전 설치
npm install domquery-com@1.0.0

# 개발 의존성으로 설치
npm install domquery-com --save-dev

# 전역 설치 (권장하지 않음)
npm install -g domquery-com
```

#### yarn
```bash
# 기본 설치
yarn add domquery-com

# 특정 버전 설치
yarn add domquery-com@1.0.0

# 개발 의존성으로 설치
yarn add domquery-com --dev
```

#### pnpm
```bash
# 기본 설치
pnpm add domquery-com

# 특정 버전 설치
pnpm add domquery-com@1.0.0

# 개발 의존성으로 설치
pnpm add -D domquery-com
```

#### 설치 확인
```bash
# 설치된 버전 확인
npm list domquery-com

# 또는
npm info domquery-com version
```

> **참고**: npm은 패키지 전체(원본 + minified)를 설치합니다.  
> 하지만 코드에서 원하는 버전(원본 또는 minified)을 선택해서 사용할 수 있습니다.

### Node.js 및 번들러에서 사용

#### 원본 vs Minified 선택

npm 설치 시 원본과 minified가 모두 설치되지만, 코드에서 원하는 버전을 선택할 수 있습니다:

**원본 사용 (개발용 - 디버깅 용이)**
```javascript
const $ = require('domquery-com');
// 또는
import $ from 'domquery-com';
```

**Minified 사용 (프로덕션용 - 파일 크기 최소화)**
```javascript
const $ = require('domquery-com/min');
// 또는
import $ from 'domquery-com/minified';
```

**번들러 설정 (Webpack, Vite 등)에서 Minified만 포함**

번들러를 사용하는 경우, 프로덕션 빌드에서 minified만 포함하도록 설정할 수 있습니다:

```javascript
// webpack.config.js 예시
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
// 원본 버전 (기본)
const $ = require('domquery-com');

// Minified 버전
const $ = require('domquery-com/min');
```

#### ES Modules (import)
```javascript
// 원본 버전 (기본)
import $ from 'domquery-com';

// Minified 버전
import $ from 'domquery-com/minified';
```

#### Browser (HTML)
```html
<!-- npm으로 설치한 경우 node_modules에서 직접 사용 -->
<script src="./node_modules/domquery-com/domquery.js"></script>
<script src="./node_modules/domquery-com/domquery.min.js"></script>
```

### CDN 사용 (npm 설치 없이 사용)

npm에 패키지가 등록되면 **자동으로 CDN이 제공**됩니다. npm 설치 없이 바로 사용할 수 있습니다.

```html
<!-- npm 기반 CDN (자동 제공) - 권장 -->
<!-- 개발용 -->
<script src="https://cdn.jsdelivr.net/npm/domquery-com@1.0.0/domquery.js"></script>
<!-- 또는 -->
<script src="https://unpkg.com/domquery-com@1.0.0/domquery.js"></script>

<!-- 프로덕션 권장 -->
<script src="https://cdn.jsdelivr.net/npm/domquery-com@1.0.0/domquery.min.js"></script>
<!-- 또는 -->
<script src="https://unpkg.com/domquery-com@1.0.0/domquery.min.js"></script>

<!-- 최신 버전 사용 (버전 번호 생략 가능) -->
<script src="https://unpkg.com/domquery-com/domquery.min.js"></script>
```

> **참고**: 
> - **npm 기반 CDN**은 npm에 패키지가 등록되면 자동으로 제공됩니다.
> - `unpkg`와 `jsdelivr` 모두 무료로 제공하는 CDN 서비스입니다.
> - 프로덕션에서는 특정 버전(`@1.0.0`)을 명시하는 것을 권장합니다.
> - `package.json`의 `unpkg`와 `jsdelivr` 필드가 자동으로 minified 버전을 가리킵니다.

#### 추가 모듈 로드 (Loading Additional Modules)

추가 모듈을 별도로 로드해야 하는 경우, CDN을 통해 접근할 수 있습니다:

```html
<!-- 메인 라이브러리 (Main library) -->
<script src="https://unpkg.com/domquery-com@1.0.0/domquery.min.js"></script>

<!-- 추가 모듈 (Additional modules) -->
<script src="https://unpkg.com/domquery-com@1.0.0/src_min/alert.min.js"></script>
<script src="https://unpkg.com/domquery-com@1.0.0/src_min/ajax.min.js"></script>
<script src="https://unpkg.com/domquery-com@1.0.0/src_min/select.min.js"></script>
<script src="https://unpkg.com/domquery-com@1.0.0/src_min/animate.min.js"></script>
<!-- 등등... -->

<!-- 또는 jsdelivr 사용 -->
<script src="https://cdn.jsdelivr.net/npm/domquery-com@1.0.0/src_min/alert.min.js"></script>
```

> **참고**: `package.json`의 `files` 필드에 포함된 모든 파일은 CDN을 통해 접근 가능합니다.  
> (All files included in the `files` field of `package.json` are accessible via CDN.)

### 사용 예제

```javascript
// DOM 조작
$('.my-element').addClass('active').css('color', 'red');

// Ajax (Promise 기반)
const data = await $.ajax({
    url: '/api/data',
    method: 'GET'
});

// Alert (모바일 최적화)
$alert('Hello World!', {
    radius: '15px',
    background: '#68717e'
});
```

## 📖 문서

- [공식 문서](https://domquery.com)
- [소개](https://domquery.com/?introduction)
- [API 참조](https://domquery.com)
- [예제](https://domquery.com)

## 🎯 사용 사례

- 하이브리드 앱 개발 (Android/iOS WebView)
- 모바일 웹앱
- SPA (Single Page Application)
- file:// URL 기반 앱

## 📦 파일 구조

```
DomQuery/
├── domquery.js          # 핵심 라이브러리
├── src/
│   ├── ajax.js         # Ajax 모듈
│   ├── alert.js        # Alert 모듈
│   ├── select.js       # Select 모듈
│   ├── animate.js      # Animation 모듈
│   ├── lazyLoadImages.js # LazyLoad 모듈
│   ├── pulling.js      # Pulling 모듈
│   ├── AES.js          # 암호화 유틸리티
│   └── SHA256.js       # 해시 유틸리티
└── docs/               # 문서
```

## 🤝 기여

기여를 환영합니다! Issues와 Pull Requests를 통해 참여해주세요.

- [기여 가이드라인](https://github.com/domquery-com/domquery/blob/main/CONTRIBUTING.md)
- [행동 강령](https://github.com/domquery-com/domquery/blob/main/CODE_OF_CONDUCT.md)

## 📄 라이선스

MIT 라이선스 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👥 개발자

- **Byeonghee Gong** - bankcgi@naver.com
- **Taeyoon Gong** - domquery.com@gmail.com

## 🔗 링크

- [공식 웹사이트](https://domquery.com)
- [문서](https://domquery.com/?introduction)
- [GitHub Issues](https://github.com/domquery-com/domquery/issues)
- [GitHub Discussions](https://github.com/domquery-com/domquery/discussions)

---

⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!
