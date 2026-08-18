function Loader({ exiting }) {
  return (
    <div className={`loader-wrapper ${exiting ? 'loader-exit' : ''}`}>
      <div className="loader-content">
        <span className="loader-logo">Oluwaseun Dev</span>
        <div className="loader-spinner"></div>
      </div>
    </div>
  );
}

export default Loader;