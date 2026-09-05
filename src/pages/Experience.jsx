import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getExperience } from '../services/experienceService';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function Experience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getExperience()
      .then((data) => setExperience(data))
      .catch(() => setError('Could not load experience right now.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <section className="experience-page">
        <div className="text-center mb-5">
          <h1 className="section-heading">Experience</h1>
          <p className="section-subheading">My professional journey so far</p>
        </div>

        {loading && <p className="text-center projects-status">Loading experience...</p>}
        {error && <p className="text-center projects-status">{error}</p>}

        {!loading && !error && (
          <div className="experience-timeline">
            {experience.map((item) => (
              <div className="experience-item" key={item.id}>
                <div className="experience-dot"></div>
                <div className="experience-content">
                  <span className="experience-dates">
                    {formatDate(item.start_date)} — {item.is_current ? 'Present' : formatDate(item.end_date)}
                  </span>
                  <h3>{item.role}</h3>
                  <p className="experience-company">{item.company}</p>
                  <p className="experience-description">{item.description}</p>
                </div>
              </div>
            ))}

            {experience.length === 0 && (
              <p className="text-center projects-status">No experience entries yet.</p>
            )}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

export default Experience;