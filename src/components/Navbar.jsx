import "./Navbar.css";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo Kanban" className="navbar-img" />
      </div>

      {/* Links */}
      <div className="navbar-links">
        <a
          href="https://github.com/SEU_USUARIO"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}
