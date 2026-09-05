import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { createProject, updateProject } from '../services/projectService';

function ProjectFormModal({ existingProject, onClose, onSuccess }) {
  const isEditMode = Boolean(existingProject);

  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    live_demo_url: '',
    github_url: '',
    category: '',
    status: 'Draft',
    tech_stack: '',
    is_featured: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (existingProject) {
      setFormValues({
        title: existingProject.title || '',
        description: existingProject.description || '',
        live_demo_url: existingProject.live_demo_url || '',
        github_url: existingProject.github_url || '',
        category: existingProject.category || '',
        status: existingProject.status || 'Draft',
        tech_stack: existingProject.tech_stack || '',
        is_featured: existingProject.is_featured || false,
      });
      setImagePreview(existingProject.image || null);
    }
  }, [existingProject]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isEditMode && !imageFile) {
      setError('Please select an image.');
      return;
    }

    setSubmitting(true);

    const data = new FormData();
    data.append('title', formValues.title);
    data.append('description', formValues.description);
    data.append('live_demo_url', formValues.live_demo_url);
    data.append('github_url', formValues.github_url);
    data.append('category', formValues.category);
    data.append('status', formValues.status);
    data.append('tech_stack', formValues.tech_stack);
    data.append('is_featured', formValues.is_featured);
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (isEditMode) {
        await updateProject(existingProject.id, data);
      } else {
        await createProject(data);
      }
      onSuccess();
    } catch (err) {
      console.log('Actual error:', err.message);
      setError('Something went wrong. Please check your inputs and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditMode ? 'Edit Project' : 'Add New Project'}</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label-custom">Title</label>
            <input
              type="text"
              name="title"
              className="form-control-custom"
              value={formValues.title}
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="mb-3">
            <label className="form-label-custom">Project Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control-custom"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="modal-image-preview" />
            )}
          </div>

          <div className="mb-3">
            <label className="form-label-custom">Tech Stack</label>
            <input
              type="text"
              name="tech_stack"
              className="form-control-custom"
              value={formValues.tech_stack}
              onChange={handleChange}
              placeholder="React, Django, MySQL"
            />
            <small className="modal-hint">Separate each technology with a comma.</small>
          </div>

          <div className="mb-3">
            <label className="form-label-custom">Live Demo URL</label>
            <input
              type="url"
              name="live_demo_url"
              className="form-control-custom"
              value={formValues.live_demo_url}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label-custom">GitHub URL</label>
            <input
              type="url"
              name="github_url"
              className="form-control-custom"
              value={formValues.github_url}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label-custom">Category</label>
            <input
              type="text"
              name="category"
              className="form-control-custom"
              value={formValues.category}
              onChange={handleChange}
              placeholder="e.g. Full Stack, Web App"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label-custom">Status</label>
            <select
              name="status"
              className="form-control-custom"
              value={formValues.status}
              onChange={handleChange}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          <div className="mb-3 modal-checkbox-row">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              checked={formValues.is_featured}
              onChange={handleChange}
            />
            <label htmlFor="is_featured">Feature this project on the homepage</label>
          </div>

          {error && <p className="field-error">{error}</p>}

          <button
            type="submit"
            className="btn-cta-filled w-100 mt-2"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add Project'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProjectFormModal;