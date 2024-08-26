import { useState } from 'react';
import PropTypes from 'prop-types';
import '../theme/themes.css';

const CustomCheckbox = ({ label = 'Label', initialChecked = false, onChange }) => {
    const [isChecked, setIsChecked] = useState(initialChecked);
    
    const handleChange = () => {
        setIsChecked(!isChecked);
        if (onChange) {
        onChange(!isChecked);
        }
    };
    
    return (
        <label className="custom-checkbox">
        <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
        />
        <span className="checkmark">{isChecked ? 'X' : ''}</span>
        {label}
        </label>
    );
};
CustomCheckbox.propTypes = {
    label: PropTypes.string,
    initialChecked: PropTypes.bool,
    onChange: PropTypes.func,
};

export default CustomCheckbox