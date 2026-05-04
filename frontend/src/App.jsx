import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "/api";

function App() {
  const [message, setMessage] = useState("API 연결 확인 중...");
  const [isHealthy, setIsHealthy] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch(`${API_URL}/health`);
        const data = await res.json();
        setIsHealthy(true);
        setMessage(data.message || "응답은 왔지만 메시지가 없습니다.");
      } catch (error) {
        setIsHealthy(false);
        setMessage("API 연결 실패: URL 또는 배포 상태를 확인하세요.");
      }
    };

    fetchHealth();
  }, []);

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="chip">Deploy Ready Starter</p>
        <h1>Vercel 단일 배포 템플릿</h1>
        <p className="description">
          프론트(Vite)와 서버리스 API를 한 번에 배포할 수 있는 구성입니다.
          결제 없이 무료 플랜으로 빠르게 시작할 수 있습니다.
        </p>

        <div className={`status ${isHealthy === true ? "ok" : isHealthy === false ? "error" : ""}`}>
          <span className="dot" />
          <span>{message}</span>
        </div>

        <div className="meta-row">
          <span>현재 API 주소</span>
          <code>{API_URL}</code>
        </div>
      </section>
    </main>
  );
}

export default App;
