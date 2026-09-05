import { FiExternalLink, FiGithub } from 'react-icons/fi';

function ProjectCard({ project }) {
  const techList = project.tech_stack
    ? project.tech_stack.split(',').map((tech) => tech.trim()).filter(Boolean)
    : [];

  return (
    <div className="project-card h-100">
      <div className="project-image-wrapper">
        <img src={project.image} alt={project.title} />
      </div>

      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        {techList.length > 0 && (
          <div className="project-tech-pills">
            {techList.map((tech) => (
              <span key={tech} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>
        )}

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