# 한국어 자동 번역 서비스 🇰🇷➡️🇺🇸

실시간 음성 인식과 텍스트 번역을 지원하는 무료 한국어-영어 번역 웹 애플리케이션입니다.

## 주요 기능

- ** 실시간 음성 번역**: 마이크를 통해 말한 한국어를 실시간으로 영어로 번역
- ** 텍스트 번역**: 텍스트로 입력한 한국어를 영어로 번역
- ** 실시간 피드백**: 음성 인식과 번역 결과를 즉시 확인
- ** 브라우저 기반**: 별도 설치 없이 웹 브라우저에서 바로 사용
- ** 완전 무료**: 무료 API와 브라우저 내장 기능만 사용

## 🛠️

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS 4
- **음성 인식**: Web Speech API (브라우저 내장)
- **번역 API**: MyMemory Translation API
- **HTTP Client**: Axios
- **배포**: Vercel (pending)

## 🏗️ 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   └── translate/
│   │       └── route.ts          # 번역 API 엔드포인트
│   ├── components/
│   │   ├── TranslateBox.tsx      # 텍스트 번역 컴포넌트
│   │   └── VoiceTranslator.tsx   # 음성 번역 컴포넌트
│   ├── page.tsx                  # 메인 페이지
│   ├── layout.tsx               # 레이아웃
│   └── globals.css              # 전역 스타일
└── types/
    └── global.d.ts              # TypeScript 타입 정의
```

## 🔧

### 음성 인식 (Web Speech API)

```javascript
const SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "ko-KR";
recognition.continuous = true;
recognition.interimResults = true;
```

### 번역 프로세스

1. **음성 → 텍스트**: 브라우저 내장 음성 인식 엔진 사용
2. **텍스트 → 번역**: MyMemory API를 통한 한영 번역
3. **백업 시스템**: API 실패 시 내장 사전 사용

### 데이터 흐름

```
음성 입력 → Web Speech API → 한국어 텍스트
    ↓
Next.js API Route → MyMemory API → 영어 번역
    ↓
React 컴포넌트 → 사용자 화면 표시
```

## 🌐

- **권장**: Chrome (최적의 음성 인식 성능)
- **지원**: Edge, Safari (제한적 음성 인식)
- **필요**: 마이크 접근 권한

## API 제한사항

### MyMemory Translation API

- **무료 한도**: 일일 5,000자 번역
- **이메일 등록 시**: 일일 10,000자
- **백업 시스템**: API 한도 초과 시 내장 사전 사용

## 향후 개선 계획

- [ ] 다국어 지원 (영어→한국어 역번역)
- [ ] 음성 출력 기능 (번역된 텍스트 읽기)
- [ ] 번역 히스토리 저장
- [ ] 더 많은 언어 쌍 지원
- [ ] PWA (Progressive Web App) 변환

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

Yohan Choi.
