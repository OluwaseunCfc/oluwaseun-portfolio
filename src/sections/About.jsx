import React from 'react';
import AboutImage from '../assets/profile-pics.png';

function About() {
  const stats = [
    { value: '30+', label: 'Projects completed' },
    { value: '3+', label: 'Years Experience' },
    { value: '25+', label: 'Happy Clients' },
  ];

  return (
    <section id="about" className="about-section">
      <div className="row align-items-center g-5">
        <div className="col-12 col-md-6">
          <div className="about-image-wrapper">
            <img src={AboutImage} alt="Oluwaseun working on a laptop" />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <h2 className="section-heading">About me</h2>
          <p className="about-text">
            Hello, I'm Oluwaseun, a dedicated full stack web developer with a
            passion for creating both front-end and back-end development projects. I've
            helped numerous clients and businesses bring their visions to life
            through clean, efficient code and intuitive user interface.
          </p>

          <div className="row g-3 mt-4">
            {stats.map((stat) => (
              <div className="col-12 col-sm-4" key={stat.label}>
                <div className="stat-card text-center">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;