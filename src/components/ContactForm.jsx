import { useState } from "react";
import "../styles/Form.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Realtime error tracking
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = handleValidateForm();

    if (isValid) {
      // We will sent this data through API call in real application
      // Example: axios.post('/api/contact', formData)
      console.log("Form submitted:", formData);

      // Reset form after successful submission
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setErrors({});

      // Show success message
      setShowSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const handleValidateForm = () => {
    let newErrors = {};

    const trimmedName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    // Full Name
    if (!trimmedName) {
      newErrors.fullName = "Name is required.";
    } else if (trimmedName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters.";
    } else if (trimmedName.length > 34) {
      newErrors.fullName = "Your name can't be greater than 35 character.";
    }

    // Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    // Phone Number
    if (formData.phone && formData.phone.trim() !== "") {
      const digitsOnly = formData.phone.replace(/\D/g, "");
      if (digitsOnly.length !== 10) {
        newErrors.phone = "Phone number must be 10 digits";
      }
    }

    // Subject
    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }

    // Message
    if (!trimmedMessage) {
      newErrors.message = "Message is required";
    } else if (trimmedMessage.length < 12) {
      newErrors.message = "Message must be at least 12 characters";
    } else if (trimmedMessage.length > 500) {
      newErrors.message = "Message cannot exceed 500 characters";
    }

    setErrors(newErrors);

    // If no errors → valid form
    return Object.keys(newErrors).length === 0; // return either true or flase because of strict comparision oparator
  };

  return (
    <div className="container">
      <header>
        <h1>Contact Form (React)</h1>
      </header>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={errors.fullName ? "error-border" : ""}
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              {errors.fullName && (
                <span className="error-message">{errors.fullName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                className={errors.email ? "error-border" : ""}
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number (Optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={errors.phone ? "error-border" : ""}
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <select
                id="subject"
                name="subject"
                className={errors.subject ? "error-border" : ""}
                value={formData.subject}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="feedback">Feedback</option>
                <option value="business">Business Proposal</option>
                <option value="other">Other</option>
              </select>
              {errors.subject && (
                <span className="error-message">{errors.subject}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                className={errors.message ? "error-border" : ""}
                rows="5"
                placeholder="Enter your message here..."
                value={formData.message}
                onChange={handleInputChange}
              />
              {errors.message && (
                <span className="error-message">{errors.message}</span>
              )}
            </div>
          </div>

          
          <button
            type="submit"
            className="submit-btn"
            disabled={Object.values(errors).some((error) => error)}
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="success-message">
          ✓ Form data submitted and logged to console!
        </div>
      )}
    </div>
  );
};

export default ContactForm;
