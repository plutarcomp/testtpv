import PropTypes from 'prop-types';
import '../theme/themes.css';

const CustomButton = ({
  type = 'rounded',
  label = 'Button',
  onClick,
  disabled = false,
  isLoading,
  //icon = null,
}) => {
  console.log('Valor de isLoading:', isLoading);
  return (
    <button
      className={`custom-button ${type} ${isLoading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? 
      <>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span className="visually-hidden">Loading...</span>
      </> : (
        <>
          {/* {icon && <span className="button-icon">{icon}</span>} */}
          {label}
        </>
      )}
    </button>
  );
};

CustomButton.propTypes = {
    type: PropTypes.oneOf(['rounded', 'circle']),
    label: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    icon: PropTypes.node,
    };

export default CustomButton;