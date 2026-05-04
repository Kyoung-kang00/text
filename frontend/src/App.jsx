import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "/api";
const PROFILE = {
  name: "강OO",
  role: "Frontend Developer",
  intro:
    "사용자 입장에서 빠르고 편한 화면을 만드는 프론트엔드 개발자입니다.",
  about:
    "React 기반 UI 개발을 중심으로 API 연동, 배포 자동화, 유지보수하기 쉬운 코드 구조에 관심이 많습니다.",
  email: "your-email@example.com",
  github: "https://github.com/Kyoung-kang00",
};
const SKILLS = ["React", "JavaScript", "HTML/CSS", "Vite", "Node.js", "Vercel"];
const PROJECTS = [
  {
    title: "Vercel Fullstack Starter",
    description:
      "프론트와 서버리스 API를 하나의 프로젝트로 구성해 무료 플랜으로 빠르게 배포한 템플릿입니다.",
    stack: "React, Vite, Serverless API",
    link: "https://text-ten-gamma.vercel.app",
  },
  {
    title: "Project Placeholder",
    description: "여기에 본인 프로젝트 설명을 넣어 포트폴리오를 완성하세요.",
    stack: "Tech Stack",
    link: "https://github.com/Kyoung-kang00/text",
  },
];

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
      <section className="hero-card section">
        <p className="chip">Portfolio</p>
        <h1>{PROFILE.name}</h1>
        <p className="subtitle">{PROFILE.role}</p>
        <p className="description">{PROFILE.intro}</p>
      </section>

      <section className="section">
        <h2>About</h2>
        <p>{PROFILE.about}</p>
      </section>

      <section className="section">
        <h2>Skills</h2>
        <div className="tags">
          {SKILLS.map((skill) => (
            <span key={skill} className="tag">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Projects</h2>
        <div className="project-list">
          {PROJECTS.map((project) => (
            <article key={project.title} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p className="stack">{project.stack}</p>
              <a href={project.link} target="_blank" rel="noreferrer">
                링크 보기
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Contact</h2>
        <p>
          Email: <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </p>
        <p>
          GitHub:{" "}
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            {PROFILE.github}
          </a>
        </p>
      </section>

      <section className="section">
        <h2>API Status</h2>
        <div className={`status ${isHealthy === true ? "ok" : isHealthy === false ? "error" : ""}`}>
          <span className="dot" />
          <span>{message}</span>
        </div>
        <p className="api-url">
          API URL: <code>{API_URL}</code>
        </p>
      </section>
    </main>
  );
}

export default App;
