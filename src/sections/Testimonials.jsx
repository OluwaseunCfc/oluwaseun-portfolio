import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import testimonials from '../data/testimonials';

function Testimonials() {
  const [current, setCurrent] = useState(0);

  const total = testimonials.length;
  const testimonial = testimonials[current];

  const goPrev = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const getInitials = (name) =>
    name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="text-center mb-5">
        <h2 className="section-heading">Testimonials</h2>
        <p className="section-subheading">What my clients say about me</p>
      </div>

      <div className="testimonial-carousel">
        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={goPrev}
          aria-label="Previous testimonial"
        >
          <FiChevronLeft size={28} />
        </button>

        <div className="testimonial-card">
          <FaQuoteLeft className="testimonial-quote-icon" />

          <p className="testimonial-text">"{testimonial.quote}"</p>

          <div className="testimonial-author">
            <div className="testimonial-avatar">
              {getInitials(testimonial.name)}
            </div>
            <h3>{testimonial.name}</h3>
            <p className="testimonial-role">{testimonial.role}</p>

            <div className="testimonial-stars">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
        </div>

        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={goNext}
          aria-label="Next testimonial"
        >
          <FiChevronRight size={28} />
        </button>
      </div>

      <div className="carousel-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Testimonials;