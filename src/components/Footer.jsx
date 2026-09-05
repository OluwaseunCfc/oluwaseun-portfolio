import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';
import services from '../data/services';

function Footer() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', path: '/experience', type: 'page' },
    { label: 'Gallery', path: '/gallery', type: 'page' },
    { label: 'Contact', id: 'contact' },
  ];

  const socials = [
    { icon: FaFacebook, url: 'https://www.facebook.com/profile.php?id=100054540940464', label: 'Facebook' },
    { icon: FaInstagram, url: 'https://www.instagram.com/oluwaseundev', label: 'Instagram' },
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/oluwaseun-dev-164937426', label: 'LinkedIn' },
    { icon: FaXTwitter, url: 'https://x.com/oluwaseun_cfc', label: 'X (Twitter)' },
    { icon: FaGithub, url: 'https://github.com/oluwaseunCfc', label: 'GitHub' },
  ];

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <a href="#home" className="footer-logo" onClick={(e) => handleAnchorClick(e, 'home')}>
              Oluwaseun Dev
            </a>
            <p className="footer-bio">
              Full stack web developer creating innovative digital solutions
              with clean code and modern design. Let's collaborate.
            </p>

            <div className="footer-socials d-flex gap-3 mb-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="footer-social-icon"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>

            <ul className="footer-contact-list list-unstyled">
              <li className="d-flex align-items-center gap-2">
                <FiMail size={16} /> seunadeyelu6@gmail.com
              </li>
              <li className="d-flex align-items-center gap-2">
                <FiPhone size={16} /> +234 805 042 6392
              </li>
              <li className="d-flex align-items-center gap-2">
                <FiMapPin size={16} /> Lagos, Nigeria
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-4">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links list-unstyled">
              {quickLinks.map((link) =>
                link.type === 'page' ? (
                  <li key={link.label}>
                    <Link to={link.path}>{link.label}</Link>
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
          </div>

          <div className="col-6 col-md-4">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links list-unstyled">
              {services.map((service) => (
                <li key={service.title} className="footer-service-item">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="mb-0">© {year} Oluwaseun • All rights reserved</p>
          <div className="d-flex gap-3">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <span>Built by Oluwaseun</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;