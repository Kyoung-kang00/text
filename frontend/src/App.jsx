import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [message, setMessage] = useState("백엔드 연결 확인 중...");

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch(`${API_URL}/health`);
        const data = await res.json();
        setMessage(data.message || "응답은 왔지만 메시지가 없습니다.");
      } catch (error) {
        setMessage("백엔드 연결 실패: 백엔드 서버를 실행하거나 URL을 확인하세요.");
      }
    };

    fetchHealth();
  }, []);

  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: "2rem" }}>
      <h1>Deploy Ready Project</h1>
      <p>{message}</p>
      <p>
        API URL: <code>{API_URL}</code>
      </p>
    </main>
  );
}

export default App;
