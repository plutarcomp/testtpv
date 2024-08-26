import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../theme/themes.css';

const CustomInput = ({ 
  label,
  placeholder,
  value,
  onChange,
  isRequired,
  type }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleBlur = () => {
    setIsTouched(true);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const isValid = !isRequired || (isRequired && value.trim() !== '');
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <label className="form-label">{label}</label>
        {type === 'password' && (
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={handleTogglePassword}
            style={{ textDecoration: 'none' }}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{color: '#adb5bd'}} />
          </button>
        )}
      </div>
      <input
        type={inputType}
        className={`inputCustom form-control ${isTouched && !isValid ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
      />
      {isTouched && !isValid && (
        <div className="invalid-feedback"></div>
      )}
    </div>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

export default CustomInput;
