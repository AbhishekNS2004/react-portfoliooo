import { useState } from "react";
import { FaAward } from "react-icons/fa";
import "./styles/Certificates.css";

type Certificate = {
  id: number;
  title: string;
  issuer: string;
  description: string;
  date: string;
  image: string;
};

const certificates: Certificate[] = [
  {
    id: 1,
    title: "National Level Hackathon",
    issuer: "BGS College of Engineering and Technology (BGSCET)",
    description:
      "Participated in ADVAYA, a 24-hour national level hackathon focused on innovation and problem solving.",
    date: "April 11-12, 2025",
    image: `${import.meta.env.BASE_URL}images/image/adv.png`,
  },
  {
    id: 2,
    title: "Smart India Internal Hackathon 2025",
    issuer: "Adichunchanagiri Institute of Technology, Chikkamagaluru",
    description:
      "Participated in SMART HACK-2025 with a notable contribution to the Health theme.",
    date: "September 17, 2025",
    image: `${import.meta.env.BASE_URL}images/image/SIH.png`,
  },
  {
    id: 3,
    title: "Programming in Java",
    issuer: "NPTEL / IIT Kharagpur",
    description:
      "Completed a 12-week NPTEL course on Programming in Java with assignments and proctored exam.",
    date: "Jul-Oct 2025",
    image: `${import.meta.env.BASE_URL}images/image/npt.png`,
  },
  {
    id: 4,
    title: "CSS, JavaScript, PHP and Python Programming",
    issuer: "Udemy - Proper Dot Institute",
    description:
      "Completed a comprehensive course covering CSS, JavaScript, PHP, and Python programming.",
    date: "May 13, 2025",
    image: `${import.meta.env.BASE_URL}images/image/udemy.png`,
  },
];

const Certificates = () => {
  const [showCertificates, setShowCertificates] = useState(false);

  return (
    <section id="certificates" className="certificates-section section-container">
      <div className="certificates-container">
        <h2>
          My <span>Certificates</span>
        </h2>
        <p className="certificates-subtitle">
          A showcase of hackathons and completed courses from my learning journey.
        </p>

        <button
          className="certificates-toggle"
          data-cursor="disable"
          onClick={() => setShowCertificates((prev) => !prev)}
          type="button"
        >
          <FaAward />
          <span>{showCertificates ? "Hide Certificates" : "Show Certificates"}</span>
        </button>

        {showCertificates && (
          <div className="certificates-grid">
            {certificates.map((certificate) => (
              <article className="certificate-card" key={certificate.id}>
                <div className="certificate-image">
                  <img src={certificate.image} alt={certificate.title} />
                </div>
                <div className="certificate-content">
                  <h3>{certificate.title}</h3>
                  <p className="certificate-issuer">{certificate.issuer}</p>
                  <p>{certificate.description}</p>
                  <p className="certificate-date">{certificate.date}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;
