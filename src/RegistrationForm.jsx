
import { useState } from "react";

function RegistrationForm() {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setSuccess("");

   
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      if (name === "password") {
        if (value.length < 8) {
          updatedErrors.password =
            "Password must contain at least 8 characters.";
        } else {
          delete updatedErrors.password;
        }

        if (formData.confirmPassword &&
            value !== formData.confirmPassword) {
          updatedErrors.confirmPassword =
            "Passwords do not match.";
        } else {
          delete updatedErrors.confirmPassword;
        }
      } else {
        const fieldError = validateField(
          name,
          value,
          { ...formData, [name]: value }
        );

        if (fieldError) {
          updatedErrors[name] = fieldError;
        } else {
          delete updatedErrors[name];
        }
      }

      return updatedErrors;
    });
  };

  
  const validateField = (name, value, data) => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          return "This field is required.";
        }
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          return "Only letters are allowed.";
        }
        return "";

      case "email":
        if (!value.trim()) {
          return "Email is required.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Enter a valid email address.";
        }
        return "";

      case "mobile":
        if (!value.trim()) {
          return "Mobile number is required.";
        }
        if (!/^[6-9]\d{9}$/.test(value)) {
          return "Enter a valid 10-digit mobile number.";
        }
        return "";

      case "password":
        if (!value) {
          return "Password is required.";
        }
        if (value.length < 8) {
          return "Password must contain at least 8 characters.";
        }
        return "";

      case "confirmPassword":
        if (!value) {
          return "Please confirm your password.";
        }
        if (value !== data.password) {
          return "Passwords do not match.";
        }
        return "";

      case "dob":
        if (!value) {
          return "Date of birth is required.";
        }
        if (new Date(value + "T00:00:00") >= new Date()) {
          return "Date of birth must be in the past.";
        }
        return "";

      case "gender":
        if (!value) {
          return "Please select your gender.";
        }
        return "";

      case "address":
        if (!value.trim()) {
          return "Address is required.";
        }
        if (value.trim().length < 5) {
          return "Address must contain at least 5 characters.";
        }
        return "";

      case "city":
        if (!value.trim()) {
          return "City is required.";
        }
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          return "Enter a valid city name.";
        }
        return "";

      default:
        return "";
    }
  };

  // Validate all fields
  
  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(
        field,
        formData[field],
        formData
      );

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess("");

    if (validateForm()) {
      setSuccess(
        `Registration successful! Welcome ${formData.firstName}.`
      );

      console.log("Registration Data:", formData);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setSuccess("");
  };

  return (
    <div className="registration-container">
      <div className="registration-card">

        <div className="form-header">
          <h1>Registration Form</h1>
          <p>Please fill in your details to register.</p>
        </div>

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          <div className="form-grid">

            {/* First Name */}
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="error-message">
                  {errors.firstName}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="error-message">
                  {errors.lastName}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error-message">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Mobile */}
            <div className="form-group">
              <label>Mobile Number *</label>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter 10-digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && (
                <span className="error-message">
                  {errors.mobile}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error-message">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error-message">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dob"
                max={new Date().toISOString().split("T")[0]}
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && (
                <span className="error-message">
                  {errors.dob}
                </span>
              )}
            </div>

            {/* Gender */}
            <div className="form-group">
              <label>Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <span className="error-message">
                  {errors.gender}
                </span>
              )}
            </div>

            {/* Address */}
            <div className="form-group full-width">
              <label>Address *</label>
              <textarea
                name="address"
                placeholder="Enter your full address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <span className="error-message">
                  {errors.address}
                </span>
              )}
            </div>

            {/* City */}
            <div className="form-group full-width">
              <label>City *</label>
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && (
                <span className="error-message">
                  {errors.city}
                </span>
              )}
            </div>

          </div>

          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              Register
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
