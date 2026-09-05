import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import useTheme from '../hooks/useTheme';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: 'Home', id: 'home', type: 'anchor' },
    { label: 'About', id: 'about', type: 'anchor' },
    { label: 'Services', id: 'services', type: 'anchor' },
    { label: 'Projects', id: 'projects', type: 'anchor' },
    { label: 'Experience', path: '/experience', type: 'page' },
    { label: 'Gallery', path: '/gallery', type: 'page' },
    { label: 'Contact', id: 'contact', type: 'anchor' },
  ];

  const closeMenu = () => setIsOpen(false);

  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    closeMenu();

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-custom sticky-top">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <a href="#home" className="navbar-logo" onClick={(e) => handleAnchorClick(e, 'home')}>
          Oluwaseun Dev
        </a>

        <div className={`nav-links-wrapper ${isOpen ? 'nav-open' : ''}`}>
          <ul className="nav-links list-unstyled d-flex flex-column flex-md-row mb-0">
            {navLinks.map((link) =>
              link.type === 'page' ? (
                <li key={link.label}>
                  <Link to={link.path} onClick={closeMenu}>
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.label}>
                  <a href={`#${link.id}`} onClick={(e) => handleAnchorClick(e, link.id)}>
                    {link.label}
                  </a>
                </li>
              )
            )}
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
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
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