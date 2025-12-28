# DomQuery

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.4-blue.svg)](https://github.com/domquery-com/domquery)

웹앱 개발의 모든 기능을 하나의 통합 생태계로 제공하는 현대적인 JavaScript 라이브러리입니다.
(A modern JavaScript library that provides all the features needed for web app development in one unified ecosystem.)

---

DomQuery.js는 jQuery의 직관적인 API 설계와 체이닝 패턴에서 영감을 받았습니다. jQuery가 수많은 개발자들에게 DOM 조작을 쉽게 만들며 웹 생태계에 기여해 온 점을 존중합니다. DomQuery.js는 현대적인 웹앱 개발을 목표로 설계된 라이브러리로, 개발자들에게 익숙한 사용성을 제공하면서도 새로운 요구에 맞게 독립적으로 구현되었습니다. 중요: DomQuery.js는 처음부터 새롭게 작성된 독립적인 구현이며, jQuery의 소스 코드를 사용하지 않습니다.

(DomQuery.js is inspired by jQuery's intuitive API design and chaining patterns. We respect jQuery's contribution to making DOM manipulation easier for countless developers and its impact on the web ecosystem. DomQuery.js is a library designed for modern web app development, providing developers with familiar usability while being independently implemented to meet new requirements. Important: DomQuery.js is an independent implementation written from scratch and does not use jQuery's source code.)

---

## 소개
## Introduction

DomQuery는 웹앱 개발에 필요한 모든 기능을 하나의 라이브러리로 통합하여 제공합니다. 여러 라이브러리를 사용하는 번거로움을 없애고, DomQuery 하나로 웹앱 개발을 완성할 수 있습니다.
(DomQuery integrates all the features needed for web app development into a single library. Eliminate the hassle of using multiple libraries and complete your web app development with just DomQuery.)

**공식 사이트 / Official Website**: [https://domquery.com](https://domquery.com)

## 주요 기능
## Key Features

### 코어 모듈
### Core Modules

- **Alert**
  - 커스텀 알림창, 확인창, 프롬프트, 토스트 메시지
  - (Custom alert, confirm, prompt, and toast messages)

- **Select**
  - 커스텀 셀렉트 박스, 체크박스, 라디오, 질문 셀렉트
  - (Custom select box, checkbox, radio, and question select)

- **Animation**
  - 고급 애니메이션, 색상 보간, SVG 경로 애니메이션
  - (Advanced animations, color interpolation, SVG path animations)

- **AniPath**
  - 복잡한 경로 애니메이션
  - (Complex path animations)

- **ColorPicker**
  - 색상 선택 피커
  - (Color picker)

- **Pulling**
  - 당겨서 새로고침 (Pull-to-refresh)
  - (Pull-to-refresh functionality)

- **LazyLoadImages**
  - 이미지 지연 로딩
  - (Image lazy loading)

- **Easing**
  - 다양한 이징 함수
  - (Various easing functions)

- **Toggle**
  - 토글 메서드
  - (Toggle methods)

- **Ajax**
  - AJAX 통신, WebView Bridge 지원
  - (AJAX communication with WebView Bridge support)

- **isMobile**
  - 모바일 디바이스 감지
  - (Mobile device detection)

- **Method**
  - DOM 조작, 이벤트 처리, 유틸리티 함수
  - (DOM manipulation, event handling, utility functions)

## 빠른 시작
## Quick Start

### 기본 설치
### Basic Installation

```html
<script src="domquery.js"></script>
```

### 모듈 추가
### Adding Modules

필요한 모듈만 선택적으로 추가할 수 있습니다.
(You can selectively add only the modules you need.)

```html
<script src="src/domquery.js"></script>
<script src="src/alert.js"></script>
<script src="src/select.js"></script>
```

## 의존성
## Dependencies

모든 플러그인은 `domquery.js`를 기반으로 동작합니다. 자세한 의존성 정보는 [의존성 관계 가이드](org/의존성%20관계%20가이드.md)를 참고하세요.
(All plugins are based on `domquery.js`. For detailed dependency information, please refer to the [Dependency Guide](org/의존성%20관계%20가이드.md).)

## 문서
## Documentation

상세한 사용법과 예제는 공식 문서 사이트에서 확인할 수 있습니다:
(Detailed usage and examples are available on the official documentation site:)

**공식 사이트 / Official Website**: [https://domquery.com](https://domquery.com)

- **시작하기**
- **Getting Started**
  - [소개 / Introduction](docs/introduction/)
  - [개발 후기 / Development Notes](docs/development.html)
  - [다운로드 / Download](docs/version/)

- **코어 모듈 가이드**
- **Core Module Guides**
  - [Alert 가이드 / Alert Guide](docs/alert/)
    - 알림창, 확인창, 토스트 사용법
    - (Alert, confirm, toast usage)
  - [Select 가이드 / Select Guide](docs/select/)
    - 커스텀 셀렉트 박스 사용법
    - (Custom select box usage)
  - [Animation 가이드 / Animation Guide](docs/animation/)
    - 애니메이션 사용법
    - (Animation usage)
  - [AniPath 가이드 / AniPath Guide](docs/aniPath/)
    - 경로 애니메이션 사용법
    - (Path animation usage)
  - [ColorPicker 가이드 / ColorPicker Guide](docs/colorPicker/)
    - 컬러 피커 사용법
    - (Color picker usage)
  - [Pulling 가이드 / Pulling Guide](docs/pulling/)
    - 당겨서 새로고침 사용법
    - (Pull-to-refresh usage)
  - [LazyLoadImages 가이드 / LazyLoadImages Guide](docs/lazyLoadImages/)
    - 이미지 지연 로딩 사용법
    - (Image lazy loading usage)
  - [Easing 가이드 / Easing Guide](docs/easing/)
    - 이징 함수 사용법
    - (Easing function usage)
  - [Toggle 가이드 / Toggle Guide](docs/ToggleMethod/)
    - 토글 메서드 사용법
    - (Toggle method usage)
  - [Ajax 가이드 / Ajax Guide](docs/ajax/)
    - AJAX 통신 사용법
    - (AJAX communication usage)
  - [isMobile 가이드 / isMobile Guide](docs/isMobile/)
    - 모바일 감지 사용법
    - (Mobile detection usage)
  - [Method 가이드 / Method Guide](docs/DomQuery/)
    - DOM 조작 메서드 사용법
    - (DOM manipulation method usage)

## 사용 예시
## Usage Examples

### Alert 사용
### Using Alert

```javascript
$.alert('안녕하세요!', {
  font: '18px',
  radius: '15px',
  background: '#68717e',
  shadow: '#3498db'
}, 500);
```

### Select 사용
### Using Select

```javascript
$.select(300, {
  triggerClass: 'custom-trigger',
  optionsClass: 'custom-options'
});
```

### Animation 사용
### Using Animation

```javascript
$('.box').animate({ 
  width: '200px',
  height: '200px'
}, 500);
```

## 라이선스
## License

MIT License - 자세한 내용은 [공식 사이트](https://domquery.com/?License)를 참고하세요.
(MIT License - For details, please refer to the [official website](https://domquery.com/?License).)

## 기여
## Contributing

버그 리포트, 기능 제안, Pull Request를 환영합니다. GitHub 저장소를 방문해주세요.
(Bug reports, feature suggestions, and Pull Requests are welcome. Please visit the GitHub repository.)

## 연락처
## Contact

- 공식 사이트 / Official Website: [http://domquery.com](http://domquery.com)
- 이메일 / Email: bankcgi@naver.com, domquery.com@gmail.com
- GitHub: [https://github.com/domquery-com/domquery](https://github.com/domquery-com/domquery)

## 저작권
## Copyright

Copyright (c) 2024 DomQuery™. Developed by Byeonghee Gong & Taeyoon Gong.

### 수정된 버전 배포 시 주의사항
### Notes for Modified Versions

이 소프트웨어를 수정하여 배포하는 경우:
(If you modify and distribute this software:)

1. **원본 저작권 표시 유지**
   **Maintain Original Copyright Notice**
   - 원본이 DomQuery임을 반드시 명시해야 합니다.
   - (You must clearly state that the original is DomQuery.)

2. **라이선스 유지**
   **Maintain License**
   - MIT 라이선스 텍스트를 포함해야 합니다.
   - (You must include the MIT license text.)

3. **상표 사용 금지**
   **Trademark Usage Prohibition**
   - "DomQuery"는 상표이므로 수정된 버전에서는 "DomQuery"라는 이름을 사용할 수 없습니다.
   - ("DomQuery" is a trademark, so modified versions cannot use the "DomQuery" name.)

4. **수정 사항 명시**
   **Indicate Modifications**
   - 수정된 버전임을 명확히 표시하는 것이 좋습니다.
   - (It is recommended to clearly indicate that it is a modified version.)

**수정된 버전 배포 시 예시**
**Example for Modified Version Distribution:**

```
이 소프트웨어는 DomQuery (Copyright (c) 2024 Byeonghee Gong & Taeyoon Gong)를 기반으로 수정되었습니다.
원본은 MIT 라이선스 하에 배포됩니다.

This software is based on DomQuery (Copyright (c) 2024 Byeonghee Gong & Taeyoon Gong).
The original is distributed under the MIT License.

```
