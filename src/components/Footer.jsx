import "./Footer.css";

export default function Footer() {
  return (
    <footer className="kanban-footer">
      <span>
        © {new Date().getFullYear()} Kanban •{" "}
        <strong>José Neto</strong>
      </span>

      <div className="footer-links">
        <a
          href="https://github.com/JoseNeto09"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          GitHub
        </a>

        <span className="divider">•</span>

        <a
          href="https://linkedin.com/in/josé-lopes-sobrinho-neto-280648290"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
