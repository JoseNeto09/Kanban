import "./Navbar.css";
import logoDark from "../../assets/logo.png";
import logoLight from "../../../dist/assets/logo_branca.png";

import { VscGithubAlt } from "react-icons/vsc";
import { BsSun, BsMoon } from "react-icons/bs";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <nav className="navbar premium-nav">
      <div className="navbar-logo">
        <img
          src={theme === "dark" ? logoDark : logoLight}
          alt="Logo MyKanban"
          className="navbar-img"
        />
      </div>

      <div className="navbar-links">
        <span>App Kanban</span>
      </div>

      <div className="navbar-actions">
        <a
          href="https://github.com/JoseNeto09"
          target="_blank"
          rel="noopener noreferrer"
          className="github-icon"
          aria-label="GitHub"
        >
          <VscGithubAlt size={26} />
        </a>

        <button
          className="theme-btn"
          onClick={toggleTheme}
          aria-label="Alternar tema"
        >
          {theme === "dark" ? <BsSun size={20} /> : <BsMoon size={20} />}
        </button>
      </div>
    </nav>
  );
}
