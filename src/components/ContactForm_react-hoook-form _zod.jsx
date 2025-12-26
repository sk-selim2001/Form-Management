import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "../styles/Form.css";

// Zod validation schema for all input fields value
const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters.")
    .max(34, "Your name can't be greater than 35 character.")
    .nonempty("Full name is required."),

  email: z
    .string()
    .email("Email is not valid.")
    .nonempty("Email address is required."),

  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]+$/.test(val), "Only numbers are allowed")
    .refine(
      (val) => !val || val.length === 10,
      "Phone number must be exactly 10 digits"
    ),

  subject: z.string().nonempty("Please select a subject."),

  message: z
    .string()
    .min(12, "Message must be at least 12 characters.")
    .max(500, "Message cannot exceed 500 characters.")
    .nonempty("Message is required"),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data) {
    // API call ko simulate kiya hai
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("submitting the form", data);

    // Reset form after successful submission
    reset();
  }

  return (
    <div className="container">
      <header>
        <h1>Contact Form (react-hook-form + zod)</h1>
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
                {...register("fullName")}
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
                {...register("email")}
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
                maxLength={10}
                {...register("phone")}
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
                className={errors.subject ? "error-border" : ""}
                {...register("subject")}
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
                {...register("message")}
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
