import { Link } from 'react-router-dom';
import { FiMapPin, FiBriefcase, FiArrowRight } from 'react-icons/fi';
import profileImage from '../assets/profile-pics.png';

function Hero() {
  return (
    <section id="home" className="hero-section text-center d-flex flex-column align-items-center justify-content-center">
      <div className="hero-avatar">
        <img src={profileImage} alt="Oluwaseun Adebola Adeyelu" />
      </div>

      <h1 className="hero-name">Oluwaseun Adebola Adeyelu</h1>
      <h2 className="hero-title">Full-Stack Developer &amp; IT Consultant</h2>

      <p className="hero-location d-flex align-items-center justify-content-center gap-2">
        <FiMapPin className="text-emerald" />
        Lagos, Nigeria
      </p>

      <p className="hero-summary">
        I build seamless, responsive and scalable websites and web applications,
        combining modern design with powerful functionality to create fast,
        intuitive and user-focused digital experiences.
      </p>

      <div className="hero-cta-group d-flex flex-column flex-sm-row gap-3 justify-content-center">
        <Link to="#projects" className="btn-cta-filled d-flex align-items-center justify-content-center gap-2">
          <FiBriefcase />
          View my work
        </Link>
        <Link to="#contact" className="btn-cta-outline d-flex align-items-center justify-content-center gap-2">
          <FiArrowRight />
          Hire me
        </Link>
      </div>
    </section>
  );
}

export default Hero;