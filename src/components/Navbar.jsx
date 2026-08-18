import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import useTheme from '../hooks/useTheme';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-md navbar-custom sticky-top">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <Link to="#home" className="navbar-logo" onClick={closeMenu}>
          Oluwaseun Dev
        </Link>

        <div className={`nav-links-wrapper ${isOpen ? 'nav-open' : ''}`}>
          <ul className="nav-links list-unstyled d-flex flex-column flex-md-row mb-0">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.href} onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-resume d-md-inline-block"
          >
            Resume
          </a>
        </div>

        <div className="d-flex align-items-center gap-3">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <button
            className="menu-toggle d-md-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;