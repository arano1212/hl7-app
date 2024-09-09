import { useState } from 'react';

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <nav style={{ backgroundColor: '#2d4e6e' }} className="navbar">
        <div className="navbar-brand">
          <a className="navbar-item" href="#">
            <strong>laboratorio</strong>
          </a>
          <a
            role="button"
            className={`navbar-burger burger ${isModalOpen ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={toggleModal}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarBasicExample" className={`navbar-menu ${isModalOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <a style={{ backgroundColor: '#2d4e6e' }} className="navbar-item" onClick={toggleModal}>
              Menu
            </a>
          </div>
        </div>
      </nav>

      {/* Canvas */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '300px',
          height: '100%',
          backgroundColor: 'rgba(45, 78, 110, 0.5)',
          boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.2)',
          transform: isModalOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 1000,
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={toggleModal}
        ></div>
        <div
          style={{
            position: 'relative',
            padding: '20px',
            height: '100%',
          }}
        >
          <button
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
            }}
            aria-label="close"
            onClick={toggleModal}
          >
            ×
          </button>
          <div style={{ marginTop: '60px' }}>
            <a className="navbar-item" href="#" onClick={toggleModal}>
              Home
            </a>
            <a className="navbar-item" href="#" onClick={toggleModal}>
              About
            </a>
            <a className="navbar-item" href="#" onClick={toggleModal}>
              Results
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
