const profile = {
  displayName: "강OO",
  role: "Frontend Developer",
  oneLiner: "사용자 경험 중심의 웹 화면을 설계하고 구현합니다.",
  email: "contact@example.com",
  github: "https://github.com/Kyoung-kang00",
  blog: "https://example.com",
};

const projects = [
  {
    title: "마켓 데모 프로젝트",
    summary: "Vite + Vercel Serverless API 기반 마켓 UI 및 결제 준비 구조 구현",
    stack: "React, JavaScript, Vercel",
  },
  {
    title: "프로젝트 이름",
    summary: "여기에 프로젝트 설명을 작성하세요.",
    stack: "사용 기술 스택",
  },
];

const safeGuide = [
  "전화번호, 집주소, 주민등록번호, 상세 생년월일은 공개하지 않습니다.",
  "이메일은 포트폴리오 전용 계정을 사용하는 것을 권장합니다.",
  "민감한 이력서 원본(PDF)은 비공개 링크로만 관리하세요.",
];

function App() {
  return (
    <main className="resume-shell">
      <section className="card hero">
        <p className="chip">Public Resume Template</p>
        <h1>{profile.displayName}</h1>
        <p className="role">{profile.role}</p>
        <p className="one-liner">{profile.oneLiner}</p>
      </section>

      <section className="card">
        <h2>연락처</h2>
        <p>
          Email: <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        <p>
          GitHub:{" "}
          <a href={profile.github} target="_blank" rel="noreferrer">
            {profile.github}
          </a>
        </p>
        <p>
          Blog:{" "}
          <a href={profile.blog} target="_blank" rel="noreferrer">
            {profile.blog}
          </a>
        </p>
      </section>

      <section className="card">
        <h2>프로젝트</h2>
        <div className="project-list">
          {projects.map((project) => (
            <article key={project.title} className="project-item">
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <p className="stack">{project.stack}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card warning">
        <h2>공개 이력서 보안 가이드</h2>
        <ul>
          {safeGuide.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
