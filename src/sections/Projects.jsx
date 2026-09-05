import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProjects } from '../services/projectService';
import ProjectCard from '../components/ProjectCard';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFeaturedProjects()
      .then((data) => setProjects(data.slice(0, 4)))
      .catch(() => setError('Could not load projects right now.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="text-center mb-5">
        <h2 className="section-heading">Projects</h2>
        <p className="section-subheading">
          A selection of things I've built
        </p>
      </div>

      {loading && <p className="text-center projects-status">Loading projects...</p>}
      {error && <p className="text-center projects-status">{error}</p>}

      {!loading && !error && (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {projects.map((project) => (
              <div className="col" key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/projects" className="btn-cta-outline">
              View More Projects
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default Projects;