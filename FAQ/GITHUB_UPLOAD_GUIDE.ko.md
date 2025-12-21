# GitHub 업로드 가이드

## 업로드할 파일 목록

### 필수 파일
- ✅ `README.md` - 프로젝트 설명
- ✅ `LICENSE` - MIT License
- ✅ `.gitignore` - Git 제외 파일 목록

### 선택 파일 (권장)
- ✅ `.github/ISSUE_TEMPLATE/` - Issues 템플릿
- ✅ `.github/discussions/` - Discussions 설정
- ✅ `CONTRIBUTING.md` - 기여 가이드
- ✅ `CODE_OF_CONDUCT.md` - 행동 강령
- ✅ `package.json` - npm 패키지 정보

### 소스 파일
- `domquery.js` - 코어 라이브러리
- `src/` - 모듈 파일들
- `docs/` - 문서 (선택)

## 업로드 방법

### 1. GitHub 저장소 생성
1. GitHub에서 새 저장소 생성
2. 이름: `DomQuery`
3. Public으로 설정
4. README, LICENSE, .gitignore는 **추가하지 않음** (이미 있음)

### 2. 로컬에서 Git 초기화
```bash
cd GIT
git init
git add .
git commit -m "Initial commit: DomQuery v1.0.0"
git branch -M main
git remote add origin https://github.com/your-username/DomQuery.git
git push -u origin main
```

### 3. GitHub 설정
1. Settings → General
   - Description: "웹앱 개발에 필요한 모든 기능을 통합한 현대적인 JavaScript 라이브러리. 하이브리드 앱/WebView 환경 특화."
   - Website: https://domquery.com
   - Topics: `javascript`, `dom-manipulation`, `hybrid-app`, `webview`, `web-app`, `mobile-web`, `spa`, `ajax`, `animation`

2. Settings → Pages
   - Source: `main` 브랜치
   - Folder: `/docs` 또는 `/ (root)`

3. Settings → General → Features
   - Discussions 체크

### 4. 첫 릴리즈 생성
1. Releases → Create a new release
2. Tag: `v1.0.0`
3. Title: `DomQuery v1.0.0`
4. Description: 간단한 릴리즈 노트

## 업로드 후 확인

- [ ] README.md가 제대로 표시되는지
- [ ] LICENSE 파일이 있는지
- [ ] Issues 템플릿이 작동하는지
- [ ] Discussions가 활성화되었는지
- [ ] Topics가 설정되었는지
- [ ] GitHub Pages가 작동하는지

## 주의사항

1. **your-username**을 실제 GitHub 사용자명으로 변경
2. **domquery.com**을 실제 도메인으로 변경 (또는 GitHub Pages URL)
3. 소스 파일(`domquery.js`, `src/`)도 함께 업로드해야 함
4. 민감한 정보는 `.gitignore`에 추가

## 완료!

이제 GitHub에 "열어두기" 완료입니다.
- 자동으로 검색 노출
- 사용자가 발견 가능
- Issues/Discussions 열려있음
- 하지만 적극적 관리 불필요

