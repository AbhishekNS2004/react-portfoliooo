import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FormEvent, useMemo, useState } from "react";
import emailjs from "emailjs-com";
import { EMAILJS_RECIPIENT_EMAIL, emailjsConfig } from "../config/emailjs";
import "./styles/Contact.css";

const Contact = () => {
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [errorText, setErrorText] = useState<string>("");

  const canSend = useMemo(() => {
    return (
      fromName.trim().length > 1 &&
      /^\S+@\S+\.\S+$/.test(fromEmail.trim()) &&
      subject.trim().length > 1 &&
      message.trim().length > 5
    );
  }, [fromEmail, fromName, message, subject]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorText("");

    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
      setStatus("error");
      setErrorText(
        "EmailJS is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file."
      );
      return;
    }

    if (!canSend) {
      setStatus("error");
      setErrorText("Please fill all fields with valid information.");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: fromName.trim(),
          from_email: fromEmail.trim(),
          subject: subject.trim(),
          message: message.trim(),
          to_email: EMAILJS_RECIPIENT_EMAIL,
        },
        emailjsConfig.publicKey
      );

      setStatus("sent");
      setFromName("");
      setFromEmail("");
      setSubject("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 3500);
    } catch (err) {
      setStatus("error");
      setErrorText(
        "Failed to send message. Check the browser console and your EmailJS configuration."
      );
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:abhishekns142@gmail.com" data-cursor="disable">
                abhishekns142@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>Bachelors of Engineering</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/AbhishekNS2004"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/abhishek-ns-4a119a267/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>

          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Abhishek NS</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>

        <div className="contact-form-wrap">
          <h4>Send a message</h4>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <input
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                placeholder="Your name"
                className="contact-input"
                type="text"
                name="from_name"
              />
              <input
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                placeholder="Your email"
                className="contact-input"
                type="email"
                name="from_email"
              />
            </div>

            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="contact-input"
              type="text"
              name="subject"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              className="contact-textarea"
              name="message"
              rows={6}
            />

            <div className="contact-form-actions">
              <button
                type="submit"
                className="contact-submit"
                disabled={status === "sending" || !canSend}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              <p className={`contact-status ${status}`}>
                {status === "sent"
                  ? "Message sent successfully!"
                  : status === "error"
                    ? errorText
                    : `We will reply to ${fromEmail || "your email"}.`}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
