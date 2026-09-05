import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { createGalleryImage } from '../services/galleryService';

function GalleryFormModal({ onClose, onSuccess }) {
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

    if (!imageFile) {
      setError('Please select an image.');
      return;
    }

    setSubmitting(true);

    const data = new FormData();
    data.append('caption', caption);
    data.append('image', imageFile);

    try {
      await createGalleryImage(data);
      onSuccess();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Gallery Photo</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label-custom">Photo</label>
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
            <label className="form-label-custom">Caption (optional)</label>
            <input
              type="text"
              className="form-control-custom"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. Client meeting, 2026"
            />
          </div>

          {error && <p className="field-error">{error}</p>}

          <button
            type="submit"
            className="btn-cta-filled w-100 mt-2"
            disabled={submitting}
          >
            {submitting ? 'Uploading...' : 'Add Photo'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default GalleryFormModal;