import { useForm } from "react-hook-form";
import "../styles/Form.css";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    //API call ko simulate kiya hai
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("submitting the form", data);

    // Reset form after successful submission
    reset();
  }

  return (
    <div className="container">
      <header>
        <h1>Contact Form (react-hook-form)</h1>
      </header>

      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={errors.fullName ? "error-border" : ""}
                placeholder="Enter your full name"
                {...register("fullName", {
                  required: "Full name is required.",
                  minLength: {
                    value: 2,
                    message: "Full name must be at least 2 characters.",
                  },
                  maxLength: {
                    value: 34,
                    message: "Your name can't be greater than 35 character.",
                  },
                })}
              />
              {errors.fullName && (
                <span className="error-message">{errors.fullName.message}</span>
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
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email is not valid.",
                  },
                })}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={errors.phone ? "error-border" : ""}
                placeholder="Enter your phone number"
                {...register("phone", {
                  minLength: {
                    value: 10,
                    message: "Phone number must be 10 digits.",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numbers are allowed",
                  },
                })}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <select
                id="subject"
                name="subject"
                defaultValue=""
                className={errors.subject ? "error-border" : ""}
                {...register("subject", {
                  required: "Please select a subject.",
                })}
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
                <span className="error-message">{errors.subject.message}</span>
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
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 12,
                    message: "Message must be at least 12 characters.",
                  },
                  maxLength: {
                    value: 500,
                    message: "Your name can't be greater than 500 character.",
                  },
                })}
              />
              {errors.message && (
                <span className="error-message">{errors.message.message}</span>
              )}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Sending Message..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
