export const validateForm = (formData, requiredFields) => {
  const errors = {};

  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].toString().trim() === '') {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  return errors;
};

export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};
