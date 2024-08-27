import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../theme/themes.css';

const CustomInput = ({
  label,
  placeholder,
  type,
  error,
  register,
  name,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleBlur = () => {
    setIsTouched(true);
    console.log('first:', isTouched);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const isValid = !error
  console.log('IsValid:', isValid);

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
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ color: '#adb5bd' }} />
          </button>
        )}
      </div>
      <input
        type={inputType}
        className={`inputCustom form-control ${!isValid ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        onBlur={handleBlur}
        {...register(name)}
      />
      {!isValid && (
        <div className="invalid-feedback">{error}</div>
      )}
    </div>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default CustomInput;