import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <span>Kanban</span>
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
