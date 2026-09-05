import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { getGalleryImages, deleteGalleryImage } from '../services/galleryService';
import GalleryFormModal from './GalleryFormModal';

function GalleryManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadImages = () => {
    setLoading(true);
    getGalleryImages().then((data) => {
      setImages(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this photo? This cannot be undone.');
    if (!confirmed) return;

    try {
      await deleteGalleryImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch {
      window.alert('Failed to delete. Please try again.');
    }
  };

  const handleModalSuccess = () => {
    setShowModal(false);
    loadImages();
  };

  return (
    <div className="admin-table-card">
      <div className="admin-table-header">
        <h2>Gallery</h2>
        <button className="admin-add-btn" onClick={() => setShowModal(true)}>
          <FiPlus size={16} />
          Add Photo
        </button>
      </div>

      {loading ? (
        <p className="admin-table-status">Loading...</p>
      ) : (
        <div className="row g-3">
          {images.map((img) => (
            <div className="col-6 col-sm-4 col-lg-3" key={img.id}>
              <div className="admin-gallery-item">
                <img src={img.image} alt={img.caption || 'Gallery photo'} />
                <button
                  className="admin-gallery-delete"
                  onClick={() => handleDelete(img.id)}
                  aria-label="Delete photo"
                >
                  <FiTrash2 size={14} />
                </button>
                {img.caption && <p>{img.caption}</p>}
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <p className="admin-table-status">No photos yet.</p>
          )}
        </div>
      )}

      {showModal && (
        <GalleryFormModal
          onClose={() => setShowModal(false)}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
}

export default GalleryManager;