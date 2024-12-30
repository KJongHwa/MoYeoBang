module.exports = {
  env: {
    browser: true, // 브라우저 환경의 전역 변수 사용 허용
    es2021: true,  // ES2021 문법 사용 허용
  },
  extends: [
    'eslint:recommended',      // ESLint 추천 규칙
    'airbnb',                  // Airbnb 스타일 가이드
    'airbnb-typescript',       // Airbnb TypeScript 규칙
    'airbnb/hooks',            // Airbnb React Hooks 규칙
    'plugin:@typescript-eslint/recommended',  // TypeScript 추천 규칙
    'plugin:react/recommended', // React 추천 규칙
    'plugin:react/jsx-runtime', // React 17+ JSX 변환 규칙
    'plugin:prettier/recommended', // Prettier 통합 설정
    'next/core-web-vitals',    // Next.js 코어 웹 바이탈 규칙
  ],
  parser: '@typescript-eslint/parser', // TypeScript 구문 분석기
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // JSX 구문 분석 활성화
    },
    ecmaVersion: 'latest',    // 최신 ECMAScript 버전 사용
    sourceType: 'module',     // ES 모듈 사용
    project: './tsconfig.json', // TypeScript 설정 파일 경로
  },
  plugins: [
    'react',           // React 린트 규칙
    'jsx-a11y',        // 접근성 관련 규칙
    '@typescript-eslint', // TypeScript 특화 규칙
    'import',          // import/export 구문 관련 규칙
  ],
  rules: {
    // TypeScript 관련 규칙
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 함수의 반환 타입 명시를 강제하지 않음
    '@typescript-eslint/no-explicit-any': 'off',  // any 타입 사용 허용
    '@typescript-eslint/no-unused-vars': 'warn',  // 사용하지 않는 변수 경고
 
    // React 관련 규칙
    'react/jsx-props-no-spreading': 'off',  // props spreading 허용
    'react/react-in-jsx-scope': 'off',      // React 17+ 에서는 import React 불필요
    'react/prop-types': 'off',              // TypeScript 사용으로 prop-types 불필요
    'react/require-default-props': 'off',   // TypeScript의 옵셔널 프로퍼티 사용으로 불필요
    'react/function-component-definition': [ // 함수형 컴포넌트 정의 방식 설정
      'error',
      {
        'namedComponents': 'arrow-function',    // 이름 있는 컴포넌트는 화살표 함수로
        'unnamedComponents': 'arrow-function'   // 이름 없는 컴포넌트도 화살표 함수로
      }
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }], // JSX는 .tsx 파일에서만 허용
 
    // Import/Export 관련 규칙
    'import/prefer-default-export': 'off',  // named export 허용
    'import/extensions': 'off',             // 파일 확장자 생략 허용
 
    // 접근성 관련 규칙 (필요에 따라 활성화 고려)
    'jsx-a11y/anchor-is-valid': 'off',      // Next.js Link 컴포넌트 사용을 위해 비활성화
    'jsx-a11y/click-events-have-key-events': 'off', // 클릭 이벤트의 키보드 이벤트 강제 비활성화
    'jsx-a11y/no-static-element-interactions': 'off', // div 등 정적 요소의 이벤트 핸들러 허용
 
    // 기타 규칙
    'class-methods-use-this': 'off',        // 클래스 메서드의 this 사용 강제 해제
    'react/state-in-constructor': 'off',    // 생성자 외부에서 state 정의 허용
    'react/static-property-placement': 'off', // 정적 속성 위치 제한 해제
    'react/display-name': 'off',            // 컴포넌트 display name 설정 강제 해제
  },
 };