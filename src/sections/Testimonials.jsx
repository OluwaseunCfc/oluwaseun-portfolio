import { useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import testimonials from '../data/testimonials';

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const getIndex = (offset) => (current + offset + total) % total;

  const goPrev = () => setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  const goNext = () => setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));

  const getInitials = (name) =>
    name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();

  const renderCard = (item, isActive) => (
    <div
      className={`testimonial-card-v2 ${isActive ? 'testimonial-card-active' : 'testimonial-card-inactive'}`}
      key={item.id}
    >
      <div className="testimonial-stars-v2">
        {Array.from({ length: item.rating }).map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>

      <p className="testimonial-text-v2">"{item.quote}"</p>

      <div className="testimonial-author-v2 d-flex align-items-center gap-2">
        <div className="testimonial-avatar-v2">
          {item.image ? (
            <img src={item.image} alt={item.name} />
          ) : (
            getInitials(item.name)
          )}
        </div>
        <div>
          <h4>{item.name}</h4>
          <p>{item.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section id="testimonials" className="testimonials-section-v2">
      <div className="text-center mb-5">
        <h2 className="section-heading">Testimonials</h2>
        <p className="section-subheading">What my clients say about me</p>
      </div>

      <div className="testimonial-carousel-v2 d-none d-md-flex align-items-center justify-content-center">
        {renderCard(testimonials[getIndex(-1)], false)}
        {renderCard(testimonials[getIndex(0)], true)}
        {renderCard(testimonials[getIndex(1)], false)}
      </div>

      <div className="d-md-none">
        {renderCard(testimonials[getIndex(0)], true)}
      </div>

      <div className="testimonial-nav-buttons d-flex justify-content-center gap-3 mt-4">
        <button onClick={goPrev} className="nav-circle-btn" aria-label="Previous testimonial">
          <FiArrowLeft size={18} />
        </button>
        <button onClick={goNext} className="nav-circle-btn nav-circle-btn-filled" aria-label="Next testimonial">
          <FiArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

export default Testimonials;