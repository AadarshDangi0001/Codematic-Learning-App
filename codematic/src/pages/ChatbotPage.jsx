import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./ChatbotPage.css";
import hey from "../assets/Wave.png";

const apiUrl = import.meta.env.VITE_API_URL;
// docsResource
// Mapping of questions to their section IDs in DocsPage
const docsQuestionsMap = {
  "what is an array": "array-section",
  "what is array": "array-section",
  "explain array": "array-section",
  "what is a linked list": "linked-list-section",
  "explain linked list": "linked-list-section",
  "what is a stack": "stack-section",
  "what is stack": "stack-section",
  "what is a queue": "queue-section",
  "what is queue": "queue-section",
  "what is a hash map": "hash-map-section",
  "what is hash map": "hash-map-section",
  "what is a set": "set-section",
  "what is set": "set-section",
  "what is a tree": "tree-section",
  "what is tree": "tree-section",
  "what is a binary tree": "binary-tree-section",
  "what is binary tree": "binary-tree-section",
  "what is a binary search tree": "bst-section",
  "what is bst": "bst-section",
  "what is a graph": "graph-section",
  "what is graph": "graph-section",
  "what is a heap": "heap-section",
  "what is heap": "heap-section",
  "what is a trie": "trie-section",
  "what is trie": "trie-section",
  "what is a deque": "deque-section",
  "what is deque": "deque-section",
  "what is a priority queue": "priority-queue-section",
  "what is priority queue": "priority-queue-section",
  "what is a circular queue": "circular-queue-section",
  "what is circular queue": "circular-queue-section",
};

export default function ChatbotPage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      text: "Hello! Ask me to generate code or explain concepts.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [code, setCode] = useState("");
  const [resources, setResources] = useState("");
  const [likedMessages, setLikedMessages] = useState([]);
  const [showLiked, setShowLiked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("Failed to get AI response");

      const data = await response.json();
      let { explanation, code, resources } = data;
      const cleanedExplanation = explanation.replace(/---\n\n/g, "").trim();
      
      // Check if question exists in documentation
      const lowerInput = input.toLowerCase();
      let docsResource = "";
      
      for (const [question, sectionId] of Object.entries(docsQuestionsMap)) {
        if (lowerInput.includes(question)) {
          docsResource = `\n- [📚 View detailed documentation for this topic](/docs#${sectionId})`;
          break;
        }
      }
      
      // Add docs link to resources if found
      if (docsResource) {
        resources += docsResource;
      }

      const explanationChunks = cleanedExplanation.split("\n");

      for (let i = 0; i < explanationChunks.length; i++) {
        const chunk = explanationChunks[i];
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { text: chunk, sender: "bot", timestamp: new Date() },
          ]);
        }, 1500 * i);
      }

      setExplanation(cleanedExplanation);
      setCode(code);
      setResources(resources);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble responding. Please try again later.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  };

  const toggleSpeech = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.rate = 1;
      speech.pitch = 1;
      speech.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(speech);
      setIsSpeaking(true);
    }
  };

  const handleLikeMessage = (message) => {
    if (!likedMessages.includes(message.text)) {
      setLikedMessages((prev) => [...prev, message.text]);
    }
  };

  return (
    <div className="chatmain">
      <header className="chat-header">
        <div className="chat-right">
          <i onClick={handleBack} className="ri-arrow-left-line"></i>
          <h2>Hello, {currentUser?.displayName || "Aadarsh"}</h2>
          <div className="hey-img">
            <img src={hey} alt="" />
          </div>
        </div>

        <div className="chat-header-left">
          <div className="speaker-buttons">
            <button
              onClick={() => toggleSpeech(explanation)}
              disabled={isLoading}
              className="speaker-button"
            >
              🎤 Read Explanation
            </button>
            <button
              onClick={() => toggleSpeech(code)}
              disabled={isLoading}
              className="speaker-button"
            >
              🎤 Read Code
            </button>
          </div>

          <div className="liked-section">
            <i
              className="ri-heart-fill"
              onClick={() => setShowLiked(!showLiked)}
              title="Liked Messages"
              style={{ cursor: "pointer", fontSize: "20px", marginRight: "10px" }}
            ></i>
            {showLiked && (
              <div className="liked-dropdown">
                <h4>❤️ Liked Messages</h4>
                {likedMessages.length === 0 ? (
                  <p>No liked messages yet.</p>
                ) : (
                  <ul>
                    {likedMessages.map((msg, idx) => (
                      <li key={idx} style={{ marginBottom: "8px" }}>
                        {msg}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <i className="ri-search-line"></i>
          <i className="ri-notification-3-line"></i>
          <button>
            <i onClick={handleLogout} className="ri-logout-box-r-line"></i>
          </button>
        </div>
      </header>

      <div className="container">
        <div className="chatbot-container">
          <div className="chat-head">
            <h2>Chat Bot</h2>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === "user" ? "user-message" : "bot-message"} ${
                  index === messages.length - 1 && isLoading ? "thinking" : ""
                }`}
              >
                <div className="message-content">
                  <div>
                    {message.text
                      .split("\n")
                      .filter((line) => line.trim() !== "")
                      .map((line, idx) => {
                        const match = line.match(/\[(.*?)\]\((.*?)\)/);
                        if (match) {
                          const [_, title, link] = match;
                          return (
                            <div key={idx} style={{ marginBottom: "8px" }}>
                              <h4 style={{ margin: "4px 0" }}>{title}</h4>
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#007bff" }}
                              >
                                {link}
                              </a>
                            </div>
                          );
                        } else {
                          return (
                            <p key={idx} style={{ marginBottom: "8px", lineHeight: "1.5" }}>
                              {line}
                            </p>
                          );
                        }
                      })}
                  </div>

                  {(message.sender === "bot" || message.sender === "user") && (
                    <button
                      onClick={() => handleLikeMessage(message)}
                      className="like-button"
                      title="Like"
                    >
                      <i
                        className={
                          likedMessages.includes(message.text)
                            ? "ri-heart-fill"
                            : "ri-heart-line"
                        }
                        style={{
                          color: likedMessages.includes(message.text) ? "red" : "#aaa",
                        }}
                      ></i>
                    </button>
                  )}

                  {!isLoading && (
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot-message thinking">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              placeholder="Ask a question or talk..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="chat-input"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="send-button"
            >
              {isLoading ? "..." : <i className="ri-send-plane-2-line"></i>}
            </button>
            <button
              onClick={handleVoiceInput}
              disabled={isLoading}
              className="voice-input-button"
            >
              <i className="ri-mic-2-line mic"></i>
            </button>
          </div>
        </div>

        <div className="editor-container" style={{ width: "60%" }}>
          <h2>Generated Code</h2>
          <pre className="code-editor">{code}</pre>
        </div>

        <div className="resources-container" style={{ width: "25%", overflow: "hidden" }}>
          <h2>Related Resources</h2>
          {resources ? (
            <div className="resources-content">
              {resources
                .trim()
                .split("\n")
                .filter((line) => line.startsWith("-"))
                .map((item, index) => {
                  const match = item.match(/\[(.*?)\]\((.*?)\)/);
                  if (!match) return null;
                  const [_, title, link] = match;
                  return (
                    <div key={index} className="resource-item" style={{ marginBottom: "10px" }}>
                      <h4 style={{ margin: "5px 0" }}>{title}</h4>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#007bff" }}
                      >
                        {link}
                      </a>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p>No resources available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}