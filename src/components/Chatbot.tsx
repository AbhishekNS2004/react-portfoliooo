import { FormEvent, useEffect, useRef, useState } from "react";
import { FaComments, FaPaperPlane, FaTimes } from "react-icons/fa";
import "./styles/Chatbot.css";

type Message = {
  role: "bot" | "user";
  text: string;
  timestamp: Date;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I am here to help. Ask me about Abhishek's skills, projects, contact info, certificates, or anything else about this portfolio!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase().trim();

    if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy)[\s!.]*$/i.test(msg)) {
      return "Hello! How can I help you today? Ask me about Abhishek's skills, projects, contact info, or certificates.";
    }
    if (/how are you|what'?s up|how do you do/i.test(msg)) {
      return "I am doing great, thanks for asking! Ready to answer any questions about this portfolio.";
    }
    if (/^(who|name|abhishek|introduce|tell me about)/i.test(msg) || /what is (your|his|this) name/i.test(msg)) {
      return "This portfolio belongs to Abhishek, a full-stack developer who builds practical and user-focused digital products.";
    }
    if (/skill|tech|technology|framework|programming|language|expertise|proficient|know/i.test(msg)) {
      return "Abhishek's skills include:\n\n**Frontend:** React.js, JavaScript, HTML, CSS\n**Backend:** Node.js, Python, Java, PHP\n**Database:** MongoDB, MySQL, SQL\n**DevOps/Cloud:** Linux, CI/CD, AWS, Git, GitHub";
    }
    if (/project|work|built|portfolio|ivf|ticket|brain tumor|resnet|hackathon/i.test(msg)) {
      return "Notable projects:\n\n**1. Hospital Management System** - A full-stack Hospital Management System that enables patients, doctors, pharmacy, diagnosis, and billing modules to interact seamlessly, with features like patient tracking, prescriptions, and chatbot assistance. [GitHub](https://github.com/AbhishekNS2004/Hospital-Management-System)\n\n**2.Drug-recomandation-System** - AI-powered drug recommendation system that suggests drugs based on symptoms and medical history. [GitHub](https://github.com/AbhishekNS2004/drug_detection)\n\n**3. Brain Tumor Detection** - MRI tumor detection with ResNet50. [GitHub](https://github.com/AbhishekNS2004/Brain-tumor-detection-using-ResNet50)";
    }
    if (/contact|email|phone|reach|hire|collaborate|location|address|where|chikkamagaluru/i.test(msg)) {
      return "You can reach Abhishek at:\n\n**Email:** abhishekns142@gmail.com\n**Phone:** +91 7411255177\n**Location:** Chikkamagaluru, India";
    }
    if (/certificate|certification|certified|nptel|udemy|course|achievement/i.test(msg)) {
      return "Certificates include:\n\n- ADVAYA National Level Hackathon (BGSCET)\n- Smart India Internal Hackathon 2025\n- NPTEL Programming in Java\n- Udemy CSS, JavaScript, PHP, Python course";
    }
    if (/resume|cv|download|pdf/i.test(msg)) {
      return "You can download Abhishek's resume from the resume button in the portfolio.";
    }
    if (/github|linkedin|social|profile|link/i.test(msg)) {
      return "Connect with Abhishek:\n\n- **GitHub:** github.com/AbhishekNS2004\n- **LinkedIn:** linkedin.com/in/abhishek-ns-4a119a267/";
    }
    if (/help|menu|option|what can you|support/i.test(msg)) {
      return "I can answer about skills, projects, contact info, certificates, resume, and social links.";
    }
    if (/thank|thanks|appreciate|great|awesome/i.test(msg)) {
      return "You are welcome! Ask anything else about the portfolio.";
    }
    if (/bye|goodbye|see you|later/i.test(msg)) {
      return "Goodbye! Have a great day.";
    }

    return "I am not sure about that. Try asking about skills, projects, contact info, certificates, or resume.";
  };

  const handleSend = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage, timestamp: new Date() }]);
    setInputValue("");

    setTimeout(() => {
      const botReply = getResponse(userMessage);
      setMessages((prev) => [...prev, { role: "bot", text: botReply, timestamp: new Date() }]);
    }, 350);
  };

  const formatMessage = (text: string) => {
    return text.split("\n").map((line, i) => {
      const parts: JSX.Element[] = [];
      const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
      let match: RegExpExecArray | null;
      let lastIndex = 0;
      let key = 0;

      while ((match = regex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(<span key={key++}>{line.slice(lastIndex, match.index)}</span>);
        }
        if (match[2]) {
          parts.push(
            <a
              key={key++}
              href={match[2]}
              target="_blank"
              rel="noreferrer"
              className="chatbot-link"
            >
              {match[1]}
            </a>
          );
        } else {
          parts.push(
            <strong key={key++} className="chatbot-strong">
              {match[3]}
            </strong>
          );
        }
        lastIndex = regex.lastIndex;
      }

      if (lastIndex < line.length) {
        parts.push(<span key={key++}>{line.slice(lastIndex)}</span>);
      }

      return (
        <p key={i} className="chatbot-line">
          {parts.length ? parts : line}
        </p>
      );
    });
  };

  return (
    <>
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        data-cursor="disable"
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        type="button"
      >
        {isOpen ? <FaTimes /> : <FaComments />}
      </button>

      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <h3>Portfolio Assistant</h3>
            <p>Ask about skills, projects, contact and more</p>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div className={`chatbot-row ${m.role === "user" ? "user" : "bot"}`} key={i}>
                <div className={`chatbot-bubble ${m.role === "user" ? "user" : "bot"}`}>
                  {m.role === "bot" ? formatMessage(m.text) : m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="chatbot-input-wrap">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              className="chatbot-input"
            />
            <button type="submit" className="chatbot-send" data-cursor="disable" aria-label="Send message">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
