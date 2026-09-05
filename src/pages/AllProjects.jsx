import { useState, useEffect } from 'react';
import { getProjects } from '../services/projectService';
import ProjectCard from '../components/ProjectCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch(() => setError('Could not load projects right now.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <section className="all-projects-page">
        <div className="text-center mb-5">
          <h1 className="section-heading">All Projects</h1>
          <p className="section-subheading">
            A full look at everything I've built
          </p>
        </div>

        {loading && <p className="text-center projects-status">Loading projects...</p>}
        {error && <p className="text-center projects-status">{error}</p>}

        {!loading && !error && (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {projects.map((project) => (
              <div className="col" key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

export default AllProjects;