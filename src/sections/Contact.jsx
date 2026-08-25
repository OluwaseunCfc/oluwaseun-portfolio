import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { submitContactForm } from '../services/contactService';

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please type a message.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('submitting');

    try {
      await submitContactForm(formData);
      setStatus('success');
      setFormData({ fullName: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="text-center mb-5">
        <h2 className="section-heading">Get In Touch</h2>
        <p className="section-subheading">
          Let's work together on your next project.
        </p>
      </div>

      <div className="contact-form-wrapper">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label-custom">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={`form-control-custom ${errors.fullName ? 'is-invalid-custom' : ''}`}
              placeholder="Oluwaseun Adebola"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className="field-error">{errors.fullName}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label-custom">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control-custom ${errors.email ? 'is-invalid-custom' : ''}`}
              placeholder="oluwaseun@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label-custom">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control-custom"
              placeholder="080 000 000 00"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label-custom">
              Type a message
            </label>
            <textarea
              id="message"
              name="message"
              className={`form-control-custom textarea-custom ${errors.message ? 'is-invalid-custom' : ''}`}
              placeholder="Tell me about your project"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <p className="field-error">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="btn-cta-filled w-100 d-flex align-items-center justify-content-center gap-2 mt-4 border-0"
            disabled={status === 'submitting'}
          >
            <FiSend />
            {status === 'submitting' ? 'Sending...' : 'Send message'}
          </button>

          {status === 'success' && (
            <p className="form-status form-status-success">
              Thanks for reaching out! I'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="form-status form-status-error">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;