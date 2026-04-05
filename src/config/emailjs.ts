export const EMAILJS_RECIPIENT_EMAIL = "abhishekns142@gmail.com";

export const emailjsConfig = {
  serviceId: String(import.meta.env.VITE_EMAILJS_SERVICE_ID ?? ""),
  templateId: String(import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? ""),
  publicKey: String(import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? ""),
};

