import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "IVF Companion",
    description:
      "Supportive website for IVF patients with cycle tracking, medication reminders, and mental wellness resources. Focus on privacy and calming interface.",
    image: `${import.meta.env.BASE_URL}images/ivf.jpeg`,
    category: "fullstack",
    technologies: ["HTML", "CSS", "JavaScript", "SQL", "Python", "Alchemy"],
    liveUrl: "#",
    githubUrl: "https://github.com/AbhishekNS2004/IVF",
    featured: true,
    tools: "HTML, CSS, JavaScript, SQL, Python, Alchemy",
  },
  {
    id: 2,
    title: "AI Drug Recommendation System",
    description:
      "AI-powered drug recommendation system that suggests drugs based on symptoms and medical history.",
    image: `${import.meta.env.BASE_URL}images/image%20copy.png`,
    category: "fullstack",
    technologies: ["ReactJS", "Python", "Machine Learning", "HTML", "CSS"],
    liveUrl: "#",
    githubUrl: "https://github.com/AbhishekNS2004/drug_detection",
    featured: true,
    tools: "ReactJS, Python,XgBoost, HTML, CSS",
  },
  {
    id: 3,
    title: "Brain Tumor Detection",
    description:
      "Deep learning project for tumor detection from brain scans using transfer learning and medical image preprocessing.",
    image: `${import.meta.env.BASE_URL}images/image%20copy%202.png`,
    category: "fullstack",
    technologies: ["ResNet50", "Python", "TensorFlow", "AI/ML"],
    liveUrl: "#",
    githubUrl:
      "https://github.com/AbhishekNS2004/Brain-tumor-detection-using-ResNet50",
    featured: true,
    tools: "ResNet50, Python, TensorFlow, AI/ML",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                        <div className="project-actions">
                          {project.githubUrl !== "#" && (
                            <a
                              className="project-action-btn project-action-github"
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              data-cursor="disable"
                            >
                              <FaGithub />
                              <span>GitHub</span>
                            </a>
                          )}
                          {project.liveUrl !== "#" && (
                            <a
                              className="project-action-btn project-action-live"
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              data-cursor="disable"
                            >
                              <FaExternalLinkAlt />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
