import React from 'react';

const FormInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'text', 
  placeholder = '', 
  required = false,
  error = '',
  disabled = false,
  options = [] // For select inputs
}) => {
  const inputProps = {
    id: name,
    name,
    value,
    onChange,
    required,
    disabled,
    placeholder,
    className: `form-input ${error ? 'border-red-500 focus:ring-red-500' : ''}`
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {type === 'select' ? (
        <select {...inputProps}>
          <option value="">Select {label}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea 
          {...inputProps} 
          rows="4"
          className={`form-input resize-none ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
      ) : (
        <input type={type} {...inputProps} />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
