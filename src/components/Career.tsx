import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>DevOps Intern</h4>
                <h5>Tecmiya Solutions</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Developing and managing cloud infrastructure solutions using containerization
              and DevOps practices. Working with Linux, automation tools, and CI/CD pipelines.
              Contributing to infrastructure optimization and deployment automation projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
