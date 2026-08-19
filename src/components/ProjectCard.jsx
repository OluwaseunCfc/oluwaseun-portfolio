import { FiExternalLink, FiGithub } from 'react-icons/fi';

function ProjectCard({ project }) {
  return (
    <div className="project-card h-100">
      <div className="project-image-wrapper">
        <img src={project.image} alt={project.title} />
      </div>

      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="project-buttons d-flex gap-2">
          <a
            href={project.live_demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-filled btn-sm-cta d-flex align-items-center justify-content-center gap-2"
          >
            <FiExternalLink size={16} />
            Live Demo
          </a>
          
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-outline btn-sm-cta d-flex align-items-center justify-content-center gap-2"
          >
            <FiGithub size={16} />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;