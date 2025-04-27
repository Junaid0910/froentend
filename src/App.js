
// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import "./App.css";

// const App = () => {
//     const [transcript, setTranscript] = useState("");
//     const [isRecording, setIsRecording] = useState(false);
//     const [pdfLink, setPdfLink] = useState("");
//     const recognitionRef = useRef(null);

//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (SpeechRecognition) {
//             const recognition = new SpeechRecognition();
//             recognition.continuous = true;
//             recognition.interimResults = false;
//             recognition.lang = "en-US";

//             recognition.onresult = (event) => {
//                 let newTranscript = "";
//                 for (let i = event.resultIndex; i < event.results.length; i++) {
//                     newTranscript += event.results[i][0].transcript + " ";
//                 }
//                 setTranscript((prevTranscript) => prevTranscript + newTranscript);
//             };

//             recognition.onerror = (event) => {
//                 console.error("Speech recognition error:", event.error);
//             };

//             recognitionRef.current = recognition;
//         } else {
//             alert("Your browser does not support Speech Recognition. Try using Chrome.");
//         }
//     }, []);

//     const startRecording = () => {
//         if (recognitionRef.current && !isRecording) {
//             recognitionRef.current.start();
//             setIsRecording(true);
//         }
//     };

//     const stopRecording = () => {
//         if (recognitionRef.current && isRecording) {
//             recognitionRef.current.stop();
//             setIsRecording(false);
//         }
//     };

//     // Remove last word (Backspace feature)
//     const removeLastWord = () => {
//         setTranscript((prevTranscript) => {
//             let words = prevTranscript.trim().split(" ");
//             words.pop();
//             return words.join(" ");
//         });
//     };

//     // Add a new line to the transcript
//     const addNewLine = () => {
//         setTranscript((prevTranscript) => prevTranscript + "\n");
//     };

//     const generatePDF = async () => {
//         if (!transcript) return alert("No transcript available to generate PDF.");

//         const response = await fetch("http://localhost:5000/generate-pdf", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ transcript }),
//         });

//         const data = await response.json();
//         setPdfLink(data.pdf);
//     };

//     return (
//         <div className="app-container">
//             <motion.h1
//                 className="title"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//             >
//                 Voice to Text Converter
//             </motion.h1>

//             <motion.div className="button-group">
//                 <button className={`start-button ${isRecording ? "disabled" : ""}`} onClick={startRecording} disabled={isRecording}>
//                     🎤 Start Recording
//                 </button>
//                 <button className={`stop-button ${isRecording ? "active" : ""}`} onClick={stopRecording} disabled={!isRecording}>
//                     ⏹ Stop Recording
//                 </button>
//             </motion.div>

//             <motion.div className="transcript-container">
//                 <motion.pre className="transcript-box">
//                     <strong>Transcript:</strong> {transcript}
//                 </motion.pre>

//                 <div className="transcript-actions">
//                     <button className="next-line-button" onClick={addNewLine} disabled={!transcript}>
//                         ↩ Next Line
//                     </button>
//                     <button className="clear-word-button" onClick={removeLastWord} disabled={!transcript}>
//                         ⬅ Remove Last Word
//                     </button>
//                 </div>
//             </motion.div>

//             <button className="pdf-button" onClick={generatePDF} disabled={!transcript}>
//                 📄 Generate PDF
//             </button>
//             {pdfLink && (
//                 <motion.a href={`http://localhost:5000/download/${pdfLink.split("/").pop()}`} download className="download-link">
//                     ⬇ Download PDF
//                 </motion.a>
//             )}
//         </div>
//     );
// };

// export default App;

// import React, { useState, useEffect, useRef } from "react";
// import { BrowserRouter as Router, Route, Link,  Routes } from "react-router-dom";
// import { motion } from "framer-motion";
// import "./App.css";

// const Home = () => {
//     const [transcript, setTranscript] = useState("");
//     const [isRecording, setIsRecording] = useState(false);
//     const [pdfLink, setPdfLink] = useState("");
//     const recognitionRef = useRef(null);

//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (SpeechRecognition) {
//             const recognition = new SpeechRecognition();
//             recognition.continuous = true;
//             recognition.interimResults = false;
//             recognition.lang = "en-US";

//             recognition.onresult = (event) => {
//                 let newTranscript = "";
//                 for (let i = event.resultIndex; i < event.results.length; i++) {
//                     newTranscript += event.results[i][0].transcript + " ";
//                 }
//                 setTranscript((prevTranscript) => prevTranscript + newTranscript);
//             };

//             recognition.onerror = (event) => {
//                 console.error("Speech recognition error:", event.error);
//             };

//             recognitionRef.current = recognition;
//         } else {
//             alert("Your browser does not support Speech Recognition. Try using Chrome.");
//         }
//     }, []);

//     const startRecording = () => {
//         if (recognitionRef.current && !isRecording) {
//             recognitionRef.current.start();
//             setIsRecording(true);
//         }
//     };

//     const stopRecording = () => {
//         if (recognitionRef.current && isRecording) {
//             recognitionRef.current.stop();
//             setIsRecording(false);
//         }
//     };

//     const removeLastWord = () => {
//         setTranscript((prevTranscript) => {
//             let words = prevTranscript.trim().split(" ");
//             words.pop();
//             return words.join(" ");
//         });
//     };

//     const addNewLine = () => {
//         setTranscript((prevTranscript) => prevTranscript + "\n");
//     };

//     const generatePDF = async () => {
//         if (!transcript) return alert("No transcript available to generate PDF.");

//         const response = await fetch("http://localhost:5000/generate-pdf", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ transcript }),
//         });

//         const data = await response.json();
//         setPdfLink(data.pdf);
//     };

//     return (
//         <div className="app-container">
//             <header>
//                 <h1>AI Voice to Text Converter</h1>
//                 <p>Convert your speech into text easily and download it.</p>
//             </header>

//             <motion.div className="button-group">
//                 <button className={`start-button ${isRecording ? "disabled" : ""}`} onClick={startRecording} disabled={isRecording}>
//                     🎤 Start Recording
//                 </button>
//                 <button className={`stop-button ${isRecording ? "active" : ""}`} onClick={stopRecording} disabled={!isRecording}>
//                     ⏹ Stop Recording
//                 </button>
//             </motion.div>

//             <motion.div className="transcript-container">
//                 <motion.pre className="transcript-box">
//                     <strong>Transcript:</strong> {transcript}
//                 </motion.pre>

//                 <div className="transcript-actions">
//                     <button className="next-line-button" onClick={addNewLine} disabled={!transcript}>
//                         ↩ Next Line
//                     </button>
//                     <button className="clear-word-button" onClick={removeLastWord} disabled={!transcript}>
//                         ⬅ Remove Last Word
//                     </button>
//                 </div>
//             </motion.div>

//             <button className="pdf-button" onClick={generatePDF} disabled={!transcript}>
//                 📄 Generate PDF
//             </button>
//             {pdfLink && (
//                 <motion.a href={`http://localhost:5000/download/${pdfLink.split("/").pop()}`} download className="download-link">
//                     ⬇ Download PDF
//                 </motion.a>
//             )}

//             <footer>
//                 <Link to="/about">About Us</Link> | <Link to="/privacy">Privacy Policy</Link> | <Link to="/contact">Contact Us</Link>
//             </footer>
//         </div>
//     );
// };

// const About = () => (
//     <div className="page-container">
//         <h2>About Us</h2>
//         <p>We provide AI-powered voice-to-text transcription services.</p>
//     </div>
// );

// const Privacy = () => (
//     <div className="page-container">
//         <h2>Privacy Policy</h2>
//         <p>Your data is secure and never shared with third parties.</p>
//     </div>
// );

// const Contact = () => (
//     <div className="page-container">
//         <h2>Contact Us</h2>
//         <p>Email: support@example.com</p>
//     </div>
// );

// const App = () => (
//     <Router>
//         <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/about" element={<About />} />
//     <Route path="/contact" element={<Contact />} />
// </Routes>

//     </Router>
// );

// export default App;


// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import About from "./pages/About";
// import Privacy from "./pages/Privacy";
// import Contact from "./pages/Contact";
// import "./App.css";

// const App = () => {
//     const [transcript, setTranscript] = useState("");
//     const [isRecording, setIsRecording] = useState(false);
//     const [pdfLink, setPdfLink] = useState("");
//     const recognitionRef = useRef(null);

//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (SpeechRecognition) {
//             const recognition = new SpeechRecognition();
//             recognition.continuous = true;
//             recognition.interimResults = false;
//             recognition.lang = "en-US";

//             recognition.onresult = (event) => {
//                 let newTranscript = "";
//                 for (let i = event.resultIndex; i < event.results.length; i++) {
//                     newTranscript += event.results[i][0].transcript + " ";
//                 }
//                 setTranscript((prev) => prev + newTranscript);
//             };

//             recognition.onerror = (event) => {
//                 console.error("Speech recognition error:", event.error);
//             };

//             recognitionRef.current = recognition;
//         } else {
//             alert("Your browser does not support Speech Recognition. Try using Chrome.");
//         }
//     }, []);

//     const startRecording = () => {
//         if (recognitionRef.current && !isRecording) {
//             recognitionRef.current.start();
//             setIsRecording(true);
//         }
//     };

//     const stopRecording = () => {
//         if (recognitionRef.current && isRecording) {
//             recognitionRef.current.stop();
//             setIsRecording(false);
//         }
//     };

//     const removeLastWord = () => {
//         setTranscript((prev) => {
//             let words = prev.trim().split(" ");
//             words.pop();
//             return words.join(" ");
//         });
//     };

//     const addNewLine = () => {
//         setTranscript((prev) => prev + "\n");
//     };

//     const generatePDF = async () => {
//         if (!transcript) return alert("No transcript available to generate PDF.");

//         const response = await fetch("http://localhost:5000/generate-pdf", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ transcript }),
//         });

//         const data = await response.json();
//         setPdfLink(data.pdf);
//     };

//     return (
//         <Router>
//             <div className="navbar">
//                 <Link to="/">Home</Link>
//                 <Link to="/about">About</Link>
//                 <Link to="/privacy">Privacy</Link>
//                 <Link to="/contact">Contact</Link>
//             </div>
            
//             <Routes>
//                 <Route path="/about" element={<About />} />
//                 <Route path="/privacy" element={<Privacy />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/" element={
//                     <motion.div className="app-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
//                         <h1>Voice to Text Converter</h1>
//                         <p>Convert your speech into text easily and save it as a document.</p>

//                         <div className="button-group">
//                             <button className={`start-button ${isRecording ? "disabled" : ""}`} onClick={startRecording} disabled={isRecording}>🎤 Start Recording</button>
//                             <button className={`stop-button ${isRecording ? "active" : ""}`} onClick={stopRecording} disabled={!isRecording}>⏹ Stop Recording</button>
//                         </div>

//                         <div className="transcript-container">
//                             <pre className="transcript-box"><strong>Transcript:</strong> {transcript}</pre>
//                             <div className="transcript-actions">
//                                 <button onClick={addNewLine} disabled={!transcript}>↩ Next Line</button>
//                                 <button onClick={removeLastWord} disabled={!transcript}>⬅ Remove Last Word</button>
//                             </div>
//                         </div>

//                         <button className="pdf-button" onClick={generatePDF} disabled={!transcript}>📄 Generate PDF</button>
//                         {pdfLink && <a href={`http://localhost:5000/download/${pdfLink.split("/").pop()}`} download className="download-link">⬇ Download PDF</a>}
//                     </motion.div>
//                 } />
//             </Routes>
//         </Router>
//     );
// };

// export default App;



// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import About from "./pages/About";
// import Privacy from "./pages/Privacy";
// import Contact from "./pages/Contact";
// import "./App.css";

// const App = () => {
//     const [transcript, setTranscript] = useState("");
//     const [isRecording, setIsRecording] = useState(false);
//     const [pdfLink, setPdfLink] = useState("");
//     const recognitionRef = useRef(null);

//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (SpeechRecognition) {
//             const recognition = new SpeechRecognition();
//             recognition.continuous = true;
//             recognition.interimResults = false;
//             recognition.lang = "en-US";

//             recognition.onresult = (event) => {
//                 let newTranscript = "";
//                 for (let i = event.resultIndex; i < event.results.length; i++) {
//                     newTranscript += event.results[i][0].transcript + " ";
//                 }
//                 setTranscript((prev) => prev + newTranscript);
//             };

//             recognition.onerror = (event) => {
//                 console.error("Speech recognition error:", event.error);
//             };

//             recognitionRef.current = recognition;
//         } else {
//             alert("Your browser does not support Speech Recognition. Try using Chrome.");
//         }
//     }, []);

//     const startRecording = () => {
//         if (recognitionRef.current && !isRecording) {
//             recognitionRef.current.start();
//             setIsRecording(true);
//         }
//     };

//     const stopRecording = () => {
//         if (recognitionRef.current && isRecording) {
//             recognitionRef.current.stop();
//             setIsRecording(false);
//         }
//     };

//     const removeLastWord = () => {
//         setTranscript((prev) => {
//             let words = prev.trim().split(" ");
//             words.pop();
//             return words.join(" ");
//         });
//     };

//     const addNewLine = () => {
//         setTranscript((prev) => prev + "\n");
//     };

//     const generatePDF = async () => {
//         if (!transcript) return alert("No transcript available to generate PDF.");

//         const response = await fetch("http://localhost:5000/generate-pdf", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ transcript }),
//         });

//         const data = await response.json();
//         setPdfLink(data.pdf);
//     };

//     return (
//         <Router>
//             <div className="navbar">
//                 <Link to="/" className="logo">Voice2Text</Link>
//                 <div className="nav-links">
//                     <Link to="/about">About</Link>
//                     <Link to="/privacy">Privacy</Link>
//                     <Link to="/contact">Contact</Link>
//                 </div>
//             </div>
            
//             <Routes>
//                 <Route path="/about" element={<About />} />
//                 <Route path="/privacy" element={<Privacy />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/" element={
//                     <motion.div className="app-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
//                         <div className="hero-section">
//                             <h1>Voice to Text Converter</h1>
//                             <p>Effortlessly convert your speech into text and save it as a document. Perfect for notes, meetings, and more.</p>
//                         </div>

//                         <div className="button-group">
//                             <button className={`start-button ${isRecording ? "disabled" : ""}`} onClick={startRecording} disabled={isRecording}>🎤 Start Recording</button>
//                             <button className={`stop-button ${isRecording ? "active" : ""}`} onClick={stopRecording} disabled={!isRecording}>⏹ Stop Recording</button>
//                         </div>

//                         <div className="transcript-container">
//                             <pre className="transcript-box"><strong>Transcript:</strong> {transcript}</pre>
//                             <div className="transcript-actions">
//                                 <button onClick={addNewLine} disabled={!transcript}>↩ Add New Line</button>
//                                 <button onClick={removeLastWord} disabled={!transcript}>⬅ Remove Last Word</button>
//                             </div>
//                         </div>

//                         <button className="pdf-button" onClick={generatePDF} disabled={!transcript}>📄 Generate PDF</button>
//                         {pdfLink && <a href={`http://localhost:5000/download/${pdfLink.split("/").pop()}`} download className="download-link">⬇ Download PDF</a>}
//                     </motion.div>
//                 } />
//             </Routes>
//         </Router>
//     );
// };

// export default App;







// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import About from "./pages/About";
// import Privacy from "./pages/Privacy";
// import Contact from "./pages/Contact";
// import "./App.css";

// const App = () => {
//     const [transcript, setTranscript] = useState("");
//     const [isRecording, setIsRecording] = useState(false);
//     const [pdfLink, setPdfLink] = useState("");
//     const recognitionRef = useRef(null);

//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (SpeechRecognition) {
//             const recognition = new SpeechRecognition();
//             recognition.continuous = true;
//             recognition.interimResults = false;
//             recognition.lang = "en-US";

//             recognition.onresult = (event) => {
//                 let newTranscript = "";
//                 for (let i = event.resultIndex; i < event.results.length; i++) {
//                     newTranscript += event.results[i][0].transcript + " ";
//                 }
//                 setTranscript((prev) => prev + newTranscript);
//             };

//             recognition.onerror = (event) => {
//                 console.error("Speech recognition error:", event.error);
//             };

//             recognitionRef.current = recognition;
//         } else {
//             alert("Your browser does not support Speech Recognition. Try using Chrome.");
//         }
//     }, []);

//     const startRecording = () => {
//         if (recognitionRef.current && !isRecording) {
//             recognitionRef.current.start();
//             setIsRecording(true);
//         }
//     };

//     const stopRecording = () => {
//         if (recognitionRef.current && isRecording) {
//             recognitionRef.current.stop();
//             setIsRecording(false);
//         }
//     };

//     const removeLastWord = () => {
//         setTranscript((prev) => {
//             let words = prev.trim().split(" ");
//             words.pop();
//             return words.join(" ");
//         });
//     };

//     const addNewLine = () => {
//         setTranscript((prev) => prev + "\n");
//     };

//     const generatePDF = async () => {
//         if (!transcript) return alert("No transcript available to generate PDF.");

//         const response = await fetch("http://localhost:5000/generate-pdf", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ transcript }),
//         });

//         const data = await response.json();
//         setPdfLink(data.pdf);
//     };

//     return (
//         <Router>
//             <div className="navbar">
//                 <Link to="/" className="logo">Voice2Text</Link>
//                 <div className="nav-links">
//                     <Link to="/about">About</Link>
//                     <Link to="/privacy">Privacy</Link>
//                     <Link to="/contact">Contact</Link>
//                 </div>
//             </div>
            
//             <Routes>
//                 <Route path="/about" element={<About />} />
//                 <Route path="/privacy" element={<Privacy />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/" element={
//                     <motion.div className="app-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
//                         <div className="hero-section">
//                             <h1>Voice to Text Converter</h1>
//                             <p>Transform your speech into text effortlessly. Perfect for notes, meetings, and more.</p>
//                         </div>

//                         <div className="button-group">
//                             <button className={`start-button ${isRecording ? "disabled" : ""}`} onClick={startRecording} disabled={isRecording}>
//                                 {isRecording ? "🎤 Recording..." : "🎤 Start Recording"}
//                             </button>
//                             <button className={`stop-button ${isRecording ? "active" : ""}`} onClick={stopRecording} disabled={!isRecording}>
//                                 ⏹ Stop Recording
//                             </button>
//                         </div>

//                         <div className="transcript-container">
//                             <div className="transcript-header">
//                                 <h3>Transcript</h3>
//                                 <div className="transcript-actions">
//                                     <button onClick={addNewLine} disabled={!transcript}>↩ Add New Line</button>
//                                     <button onClick={removeLastWord} disabled={!transcript}>⬅ Remove Last Word</button>
//                                 </div>
//                             </div>
//                             <pre className="transcript-box">{transcript || "Your transcript will appear here..."}</pre>
//                         </div>

//                         <div className="pdf-section">
//                             <button className="pdf-button" onClick={generatePDF} disabled={!transcript}>📄 Generate PDF</button>
//                             {pdfLink && <a href={`http://localhost:5000/download/${pdfLink.split("/").pop()}`} download className="download-link">⬇ Download PDF</a>}
//                         </div>
//                     </motion.div>
//                 } />
//             </Routes>
//         </Router>
//     );
// };

// export default App;






// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import About from "./pages/About";
// import Privacy from "./pages/Privacy";
// import Contact from "./pages/Contact";
// import "./App.css";

// const App = () => {
//     const [transcript, setTranscript] = useState("");
//     const [isRecording, setIsRecording] = useState(false);
//     const [pdfLink, setPdfLink] = useState("");
//     const recognitionRef = useRef(null);

//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (SpeechRecognition) {
//             const recognition = new SpeechRecognition();
//             recognition.continuous = true;
//             recognition.interimResults = false;
//             recognition.lang = "en-US";

//             recognition.onresult = (event) => {
//                 let newTranscript = "";
//                 for (let i = event.resultIndex; i < event.results.length; i++) {
//                     newTranscript += event.results[i][0].transcript + " ";
//                 }
//                 setTranscript((prev) => prev + newTranscript);
//             };

//             recognition.onerror = (event) => {
//                 console.error("Speech recognition error:", event.error);
//             };

//             recognitionRef.current = recognition;
//         } else {
//             alert("Your browser does not support Speech Recognition. Try using Chrome.");
//         }
//     }, []);

//     const startRecording = () => {
//         if (recognitionRef.current && !isRecording) {
//             recognitionRef.current.start();
//             setIsRecording(true);
//         }
//     };

//     const stopRecording = () => {
//         if (recognitionRef.current && isRecording) {
//             recognitionRef.current.stop();
//             setIsRecording(false);
//         }
//     };

//     const removeLastWord = () => {
//         setTranscript((prev) => {
//             let words = prev.trim().split(" ");
//             words.pop();
//             return words.join(" ");
//         });
//     };

//     const addNewLine = () => {
//         setTranscript((prev) => prev + "\n");
//     };

//     const generatePDF = async () => {
//         if (!transcript) return alert("No transcript available to generate PDF.");

//         const response = await fetch("http://localhost:5000/generate-pdf", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ transcript }),
//         });

//         const data = await response.json();
//         setPdfLink(data.pdf);
//     };

//     return (
//         <Router>
//             <div className="navbar">
//                 <Link to="/" className="logo">Voice2Text</Link>
//                 <div className="nav-links">
//                     <Link to="/about">About</Link>
//                     <Link to="/privacy">Privacy</Link>
//                     <Link to="/contact">Contact</Link>
//                 </div>
//             </div>
            
//             <Routes>
//                 <Route path="/about" element={<About />} />
//                 <Route path="/privacy" element={<Privacy />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/" element={
//                     <motion.div className="app-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
//                         <div className="hero-section">
//                             <h1>Voice to Text Converter</h1>
//                             <p>Effortlessly convert your speech into text and save it as a document. Perfect for notes, meetings, and more.</p>
//                         </div>

//                         <div className="button-group">
//                             <button className={`start-button ${isRecording ? "disabled" : ""}`} onClick={startRecording} disabled={isRecording}>
//                                 {isRecording ? "🎤 Recording..." : "🎤 Start Recording"}
//                             </button>
//                             <button className={`stop-button ${isRecording ? "active" : ""}`} onClick={stopRecording} disabled={!isRecording}>
//                                 ⏹ Stop Recording
//                             </button>
//                         </div>

//                         <div className="transcript-container">
//                             <div className="transcript-header">
//                                 <h3>Transcript</h3>
//                                 <div className="transcript-actions">
//                                     <button onClick={addNewLine} disabled={!transcript}>↩ Add New Line</button>
//                                     <button onClick={removeLastWord} disabled={!transcript}>⬅ Remove Last Word</button>
//                                 </div>
//                             </div>
//                             <pre className="transcript-box">{transcript || "Your transcript will appear here..."}</pre>
//                         </div>

//                         <div className="pdf-section">
//                             <button className="pdf-button" onClick={generatePDF} disabled={!transcript}>📄 Generate PDF</button>
//                             {pdfLink && <a href={`http://localhost:5000/download/${pdfLink.split("/").pop()}`} download className="download-link">⬇ Download PDF</a>}
//                         </div>
//                     </motion.div>
//                 } />
//             </Routes>
//         </Router>
//     );
// };

// export default App;





// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import About from "./pages/About";
// import Privacy from "./pages/Privacy";
// import Contact from "./pages/contact";
// import Help from "./pages/help";
// import "./App.css";

// const App = () => {
//     const [transcript, setTranscript] = useState("");
//     const [isRecording, setIsRecording] = useState(false);
//     const [pdfLink, setPdfLink] = useState("");
//     const recognitionRef = useRef(null);

//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (SpeechRecognition) {
//             const recognition = new SpeechRecognition();
//             recognition.continuous = true;
//             recognition.interimResults = false;
//             recognition.lang = "en-US";

//             recognition.onresult = (event) => {
//                 let newTranscript = "";
//                 for (let i = event.resultIndex; i < event.results.length; i++) {
//                     newTranscript += event.results[i][0].transcript + " ";
//                 }
//                 setTranscript((prev) => prev + newTranscript);
//             };

//             recognition.onerror = (event) => {
//                 console.error("Speech recognition error:", event.error);
//             };

//             recognitionRef.current = recognition;
//         } else {
//             alert("Your browser does not support Speech Recognition. Try using Chrome.");
//         }
//     }, []);

//     const startRecording = () => {
//         if (recognitionRef.current && !isRecording) {
//             recognitionRef.current.start();
//             setIsRecording(true);
//         }
//     };

//     const stopRecording = () => {
//         if (recognitionRef.current && isRecording) {
//             recognitionRef.current.stop();
//             setIsRecording(false);
//         }
//     };

//     const removeLastWord = () => {
//         setTranscript((prev) => {
//             let words = prev.trim().split(" ");
//             words.pop();
//             return words.join(" ");
//         });
//     };

//     const addNewLine = () => {
//         setTranscript((prev) => prev + "\n");
//     };

//     const generatePDF = async () => {
//         if (!transcript) return alert("No transcript available to generate PDF.");

//         const response = await fetch("http://localhost:5000/generate-pdf", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ transcript }),
//         });

//         const data = await response.json();
//         setPdfLink(data.pdf);
//     };

//     return (
//         <Router>
//             <div className="navbar">
//                 <Link to="/" className="logo">SpeechNotes</Link>
//                 <div className="nav-links">
//                     <Link to="/about">About</Link>
//                     <Link to="/privacy">Privacy</Link>
//                     <Link to="/contact">Contact</Link>
//                     <Link to="/help">Help</Link>
//                 </div>
//             </div>
            
//             <Routes>
//                 <Route path="/about" element={<About />} />
//                 <Route path="/privacy" element={<Privacy />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/help" element={<Help />} />
//                 <Route path="/" element={
//                     <motion.div className="app-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
//                         <div className="hero-section">
//                             <h1>Speech to Text</h1>
//                             <p>Start speaking, and your words will appear here.</p>
//                         </div>

//                         <div className="button-group">
//                             <button className={`start-button ${isRecording ? "disabled" : ""}`} onClick={startRecording} disabled={isRecording}>
//                                 {isRecording ? "🎤 Recording..." : "🎤 Start Recording"}
//                             </button>
//                             <button className={`stop-button ${isRecording ? "active" : ""}`} onClick={stopRecording} disabled={!isRecording}>
//                                 ⏹ Stop Recording
//                             </button>
//                         </div>

//                         <div className="transcript-container">
//                             <div className="transcript-header">
//                                 <h3>Transcript</h3>
//                                 <div className="transcript-actions">
//                                     <button onClick={addNewLine} disabled={!transcript}>↩ Add New Line</button>
//                                     <button onClick={removeLastWord} disabled={!transcript}>⬅ Remove Last Word</button>
//                                 </div>
//                             </div>
//                             <pre className="transcript-box">{transcript || "Your transcript will appear here..."}</pre>
//                         </div>

//                         <div className="pdf-section">
//                             <button className="pdf-button" onClick={generatePDF} disabled={!transcript}>📄 Generate PDF</button>
//                             {pdfLink && <a href={`http://localhost:5000/download/${pdfLink.split("/").pop()}`} download className="download-link">⬇ Download PDF</a>}
//                         </div>
//                     </motion.div>
//                 } />
//             </Routes>

//             {/* Footer */}
//             <footer className="footer">
//                 <p>&copy; {new Date().getFullYear()} SpeechNotes. All rights reserved.</p>
//             </footer>
//         </Router>
//     );
// };

// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MainApp from "./pages/MainApp";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contact from "./pages/contact";
import Help from "./pages/Help";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import "./App.css";

const App = () => {
  return (
      <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<MainApp />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Help" element={<Help />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;