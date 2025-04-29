export const userValidation = ( formData , setErrors) => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }
    if (!formData.company) {
      newErrors.company = "Company is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
