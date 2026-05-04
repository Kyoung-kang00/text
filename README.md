# Deploy Ready Starter (Frontend + Backend)

## 1) 설치
각 폴더에서 의존성을 설치하세요.

```powershell
cd frontend
npm install
cd ..
cd backend
npm install
```

## 2) 환경변수 설정
- `frontend/.env.example` -> `frontend/.env`
- `backend/.env.example` -> `backend/.env`

## 3) 로컬 실행
터미널 2개를 열어 각각 실행:

```powershell
cd backend
npm run dev
```

```powershell
cd frontend
npm run dev
```

## 4) 배포
- 프론트: Vercel (Root Directory: `frontend`)
- 백엔드: Render (Root Directory: `backend`)

프론트 환경변수:
- `VITE_API_URL=https://<your-render-url>`

백엔드 환경변수:
- `ALLOWED_ORIGIN=https://<your-vercel-url>`
