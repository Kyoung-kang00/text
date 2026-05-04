# Deploy Ready Starter (Vercel Fullstack Market)

Vite 프론트와 Vercel Serverless API를 하나의 프로젝트로 배포합니다.
현재 화면은 마켓 데모이며 `/api/checkout` 결제 세션 준비 엔드포인트를 포함합니다.

## 1) 설치

```powershell
cd frontend
npm install
```

## 2) 로컬 실행

```powershell
# API 서버 (선택)
cd backend
npm install
npm run dev
```

```powershell
# 프론트
cd frontend
npm run dev
```

기본값으로 프론트는 `/api`를 호출하고, 로컬 개발에서는 Vite 프록시가
`http://localhost:5000`으로 전달합니다.

## 3) Vercel 배포

- Vercel에서 `New Project`
- 저장소 선택: `Kyoung-kang00/text`
- Root Directory: `frontend`
- Deploy

배포 후:
- 프론트: `https://<your-app>.vercel.app`
- API: `https://<your-app>.vercel.app/api/health`
- Checkout API: `https://<your-app>.vercel.app/api/checkout` (POST)

기본 구성은 동일 도메인의 `/api`를 사용하므로 `VITE_API_URL` 설정이 필수는 아닙니다.
