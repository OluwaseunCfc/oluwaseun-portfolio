import services from '../data/services';

function Services() {
  return (
    <section id="services" className="services-section">
      <div className="text-center mb-5">
        <h2 className="section-heading">Services</h2>
        <p className="section-subheading">
          What I can do for you
        </p>
      </div>

      <div className="row g-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div className="col-12 col-sm-6 col-lg-4" key={service.title}>
              <div className="service-card h-100">
                <div className="service-icon">
                  <Icon size={24} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Services;