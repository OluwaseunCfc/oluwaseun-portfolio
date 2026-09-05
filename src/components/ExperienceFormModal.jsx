import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { createExperience, updateExperience } from '../services/experienceService';

function ExperienceFormModal({ existingExperience, onClose, onSuccess }) {
  const isEditMode = Boolean(existingExperience);

  const [formValues, setFormValues] = useState({
    company: '',
    role: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (existingExperience) {
      setFormValues({
        company: existingExperience.company || '',
        role: existingExperience.role || '',
        start_date: existingExperience.start_date || '',
        end_date: existingExperience.end_date || '',
        is_current: existingExperience.is_current || false,
        description: existingExperience.description || '',
      });
    }
  }, [existingExperience]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const payload = {
      ...formValues,
      end_date: formValues.is_current ? null : formValues.end_date || null,
    };

    try {
      if (isEditMode) {
        await updateExperience(existingExperience.id, payload);
      } else {
        await createExperience(payload);
      }
      onSuccess();
    } catch (err) {
      setError('Something went wrong. Please check your inputs and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditMode ? 'Edit Experience' : 'Add Experience'}</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label-custom">Company</label>
            <input
              type="text"
              name="company"
              className="form-control-custom"
              value={formValues.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label-custom">Role</label>
            <input
              type="text"
              name="role"
              className="form-control-custom"
              value={formValues.role}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label-custom">Start Date</label>
            <input
              type="date"
              name="start_date"
              className="form-control-custom"
              value={formValues.start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 modal-checkbox-row">
            <input
              type="checkbox"
              id="is_current"
              name="is_current"
              checked={formValues.is_current}
              onChange={handleChange}
            />
            <label htmlFor="is_current">I currently work here</label>
          </div>

          {!formValues.is_current && (
            <div className="mb-3">
              <label className="form-label-custom">End Date</label>
              <input
                type="date"
                name="end_date"
                className="form-control-custom"
                value={formValues.end_date}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label-custom">Description</label>
            <textarea
              name="description"
              className="form-control-custom textarea-custom"
              value={formValues.description}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="field-error">{error}</p>}

          <button
            type="submit"
            className="btn-cta-filled w-100 mt-2"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add Experience'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ExperienceFormModal;