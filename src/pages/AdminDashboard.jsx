import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiGrid, FiFolder, FiCode, FiBriefcase, FiAward, FiBook,
  FiMessageSquare, FiMail, FiSettings, FiLogOut, FiBell,
  FiChevronDown, FiSearch, FiPlus, FiEdit2, FiTrash2, FiMenu, FiStar, FiCalendar,
} from 'react-icons/fi';
import { getProjects } from '../services/projectService';
import services from '../data/services';
import toolbox from '../data/toolbox';
import { logout } from '../services/authService';

function AdminDashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleDelete = (id, title) => {
    const confirmed = window.confirm(`Delete "${title}"? This cannot be undone.`);
    if (confirmed) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddProject = () => {
    window.alert('Add Project form is coming soon — will be wired up once the backend is ready.');
  };

  const handleEditProject = (title) => {
    window.alert(`Edit form for "${title}" is coming soon — will be wired up once the backend is ready.`);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const publishedCount = projects.filter((p) => p.status === 'Published').length;
  const draftCount = projects.filter((p) => p.status === 'Draft').length;

  const navItems = [
    { icon: FiGrid, label: 'Dashboard', active: true },
    { icon: FiFolder, label: 'Projects' },
    { icon: FiCode, label: 'Skills' },
    { icon: FiBriefcase, label: 'Services' },
    { icon: FiAward, label: 'Experience' },
    { icon: FiBook, label: 'Education' },
    { icon: FiMessageSquare, label: 'Testimonials' },
    { icon: FiMail, label: 'Messages' },
  ];

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar-open' : ''}`}>
        <div className="admin-sidebar-brand">
          <div className="admin-logo-mark-sm">O</div>
          <div>
            <h2>Oluwaseun Dev</h2>
            <p>Admin Dashboard</p>
          </div>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`admin-nav-item ${item.active ? 'active' : ''}`}
                disabled={!item.active}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar-bottom">
          <button className="admin-nav-item" disabled>
            <FiSettings size={18} />
            Settings
          </button>
          <button className="admin-nav-item admin-logout-btn" onClick={handleLogout}>
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-menu-toggle d-lg-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu size={22} />
          </button>

          <div className="admin-topbar-right">
            <button className="admin-icon-btn">
              <FiBell size={18} />
              <span className="admin-badge">3</span>
            </button>

            <div className="admin-user-chip">
              <div className="admin-avatar-sm">O</div>
              <div className="admin-user-info">
                <span>Oluwaseun</span>
                <small>Superuser</small>
              </div>
              <FiChevronDown size={16} />
            </div>
          </div>
        </header>

        <main className="admin-content">
          <h1 className="admin-greeting">Good morning, Oluwaseun </h1>
          <p className="admin-greeting-sub">Here's what's happening with your portfolio today.</p>

          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-icon admin-stat-icon-emerald">
                <FiFolder size={20} />
              </div>
              <div>
                <p className="admin-stat-label">Projects</p>
                <h3>{projects.length}</h3>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon admin-stat-icon-blue">
                <FiCode size={20} />
              </div>
              <div>
                <p className="admin-stat-label">Skills</p>
                <h3>{toolbox.length}</h3>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon admin-stat-icon-purple">
                <FiMail size={20} />
              </div>
              <div>
                <p className="admin-stat-label">Messages</p>
                <h3>0</h3>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon admin-stat-icon-amber">
                <FiBriefcase size={20} />
              </div>
              <div>
                <p className="admin-stat-label">Services</p>
                <h3>{services.length}</h3>
              </div>
            </div>
          </div>

          <div className="admin-table-card">
            <div className="admin-table-header">
              <h2>Projects Overview</h2>

              <div className="admin-table-controls">
                <div className="admin-search-box">
                  <FiSearch size={16} />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  className="admin-status-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Status</option>
                  <option>Published</option>
                  <option>Draft</option>
                </select>

                <button className="admin-add-btn" onClick={handleAddProject}>
                  <FiPlus size={16} />
                  Add New Project
                </button>
              </div>
            </div>

            {loading ? (
              <p className="admin-table-status">Loading projects...</p>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Date Added</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project) => (
                      <tr key={project.id}>
                        <td>
                          <div className="admin-project-cell">
                            <img src={project.image} alt={project.title} />
                            <span>{project.title}</span>
                          </div>
                        </td>
                        <td>
                          <span className="admin-category-badge">{project.category}</span>
                        </td>
                        <td>
                          <span className={`admin-status-badge ${project.status === 'Published' ? 'published' : 'draft'}`}>
                            {project.status}
                          </span>
                        </td>
                        <td>{project.dateAdded}</td>
                        <td>
                          <div className="admin-action-buttons">
                            <button
                              className="admin-icon-action"
                              onClick={() => handleEditProject(project.title)}
                              aria-label="Edit project"
                            >
                              <FiEdit2 size={15} />
                            </button>
                            <button
                              className="admin-icon-action admin-icon-action-delete"
                              onClick={() => handleDelete(project.id, project.title)}
                              aria-label="Delete project"
                            >
                              <FiTrash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredProjects.length === 0 && (
                  <p className="admin-table-status">No projects match your search.</p>
                )}
              </div>
            )}
          </div>

          <div className="admin-summary-grid">
            <div className="admin-summary-card">
              <div className="admin-stat-icon admin-stat-icon-emerald">
                <FiFolder size={20} />
              </div>
              <div>
                <p className="admin-stat-label">Total Projects</p>
                <h3>{projects.length}</h3>
                <small>{publishedCount} Published • {draftCount} Draft</small>
              </div>
            </div>

            <div className="admin-summary-card">
              <div className="admin-stat-icon admin-stat-icon-amber">
                <FiStar size={20} />
              </div>
              <div>
                <p className="admin-stat-label">Featured Projects</p>
                <h3>{publishedCount}</h3>
                <small>Showcased on homepage</small>
              </div>
            </div>

            <div className="admin-summary-card">
              <div className="admin-stat-icon admin-stat-icon-blue">
                <FiCalendar size={20} />
              </div>
              <div>
                <p className="admin-stat-label">Last Updated</p>
                <h3>{projects[projects.length - 1]?.dateAdded || '—'}</h3>
                <small>{projects[projects.length - 1]?.title || 'No projects yet'}</small>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;