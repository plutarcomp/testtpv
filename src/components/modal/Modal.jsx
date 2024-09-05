import PropTypes from 'prop-types';
import './modal.css'; // Import the CSS for the modal

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null; // If the modal isn't open, return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    };

export default Modal;