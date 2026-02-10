import "./Footer.css";

export default function Footer() {
  return (
    <footer className="kanban-footer">
      <div className="footer-content">
        <span className="footer-text">
          © App Kanban Desenvolvido Por •{" "}
          <strong>José Neto</strong>
        </span>

        <div className="footer-links">
          <a
            href="https://github.com/JoseNeto09"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55v-2.02c-3.2.7-3.87-1.39-3.87-1.39-.53-1.35-1.29-1.71-1.29-1.71-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.21 1.79 1.21 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.73-1.56-2.56-.29-5.25-1.29-5.25-5.74 0-1.27.45-2.31 1.2-3.12-.12-.3-.52-1.5.12-3.13 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 5.83 0c2.22-1.5 3.2-1.19 3.2-1.19.64 1.63.24 2.83.12 3.13.75.81 1.2 1.85 1.2 3.12 0 4.46-2.7 5.44-5.27 5.73.41.36.78 1.07.78 2.15v3.18c0 .3.21.66.79.55a11.52 11.52 0 0 0 7.86-10.95C23.5 5.74 18.27.5 12 .5z" />
            </svg>
          </a>

          <a
            href="https://linkedin.com/in/josé-lopes-sobrinho-neto-280648290"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24">
              <path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.8v2.1h.05c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.7c0-1.84-.03-4.2-2.56-4.2-2.56 0-2.95 2-2.95 4.07V24h-4V8.5z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
