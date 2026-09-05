import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { getExperience, deleteExperience } from '../services/experienceService';
import ExperienceFormModal from './ExperienceFormModal';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function ExperienceManager() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const loadExperience = () => {
    setLoading(true);
    getExperience().then((data) => {
      setExperience(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadExperience();
  }, []);

  const handleAdd = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id, role) => {
    const confirmed = window.confirm(`Delete "${role}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      await deleteExperience(id);
      setExperience((prev) => prev.filter((item) => item.id !== id));
    } catch {
      window.alert('Failed to delete. Please try again.');
    }
  };

  const handleModalSuccess = () => {
    setShowModal(false);
    setEditingItem(null);
    loadExperience();
  };

  return (
    <div className="admin-table-card">
      <div className="admin-table-header">
        <h2>Experience</h2>
        <button className="admin-add-btn" onClick={handleAdd}>
          <FiPlus size={16} />
          Add Experience
        </button>
      </div>

      {loading ? (
        <p className="admin-table-status">Loading...</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Company</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {experience.map((item) => (
                <tr key={item.id}>
                  <td>{item.role}</td>
                  <td>{item.company}</td>
                  <td>
                    {formatDate(item.start_date)} — {item.is_current ? 'Present' : formatDate(item.end_date)}
                  </td>
                  <td>
                    <div className="admin-action-buttons">
                      <button className="admin-icon-action" onClick={() => handleEdit(item)} aria-label="Edit">
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        className="admin-icon-action admin-icon-action-delete"
                        onClick={() => handleDelete(item.id, item.role)}
                        aria-label="Delete"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {experience.length === 0 && (
            <p className="admin-table-status">No experience entries yet.</p>
          )}
        </div>
      )}

      {showModal && (
        <ExperienceFormModal
          existingExperience={editingItem}
          onClose={() => setShowModal(false)}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
}

export default ExperienceManager;