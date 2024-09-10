import { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../theme/themes.css';

const CustomDateInput = ({ label, placeholder, error, register, name, showErrors, min, max }) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => {
    setIsTouched(true);
    console.log('first:', isTouched);
  };

  const isValid = !error;

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <label className="form-label">{label}</label>
      </div>
      <input
        type="date"
        className={`inputCustom form-control ${!isValid ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        onBlur={handleBlur}
        {...register(name)}
        min={min} // Optional minimum date
        max={max} // Optional maximum date
      />
      {!isValid && !showErrors && (
        <div className="invalid-feedback">{error}</div>
      )}
    </div>
  );
};

CustomDateInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  showErrors: PropTypes.bool,
  min: PropTypes.string, // Optional minimum date prop
  max: PropTypes.string, // Optional maximum date prop
};

export default CustomDateInput;