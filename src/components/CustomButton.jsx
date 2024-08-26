import PropTypes from 'prop-types';
import '../theme/themes.css';

const CustomButton = ({
  type = 'rounded',
  label = 'Button',
  onClick,
  disabled = false,
  loading = false,
  icon = null,
}) => {
  return (
    <button
      className={`custom-button ${type} ${loading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? 'Loading...' : (
        <>
          {icon && <span className="button-icon">{icon}</span>}
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
    loading: PropTypes.bool,
    icon: PropTypes.node,
    };

export default CustomButton;