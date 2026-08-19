import toolbox from '../data/toolbox';

function Toolbox() {
  return (
    <section id="toolbox" className="toolbox-section">
      <div className="text-center mb-5">
        <h2 className="section-heading">Toolbox</h2>
        <p className="section-subheading">
          Here are the technologies and tools I work with to build seamless, responsive and reliable web experiences.
        </p>
      </div>

      <div className="row g-4">
        {toolbox.map((tool) => {
          const Icon = tool.icon;
          return (
            <div className="col-12 col-md-6 col-lg-3" key={tool.name}>
              <div className="toolbox-card h-100">
                <Icon size={40} color={tool.color} className="mb-3" />
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Toolbox;