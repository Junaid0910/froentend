// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import "./MainApp.css";

// const MainApp = () => {
//     const [transcript, setTranscript] = useState("");
//     const [transcripts, setTranscripts] = useState("");
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
//                 setTranscripts((prev) => newTranscript);
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
//         <div className="main-app-container">
//             <motion.div className="app-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
//                 {/* Hero Section */}
//                 <div className="hero-section">
//                     <h1>Speech to Text</h1>
//                     <p id="p" className="p">{transcripts || "Start speaking, and your words will appear here."}</p>
//                 </div>

//                 {/* Recording Controls */}
//                 <div className="button-group">
//                     <button className={`start-button ${isRecording ? "disabled" : ""}`} onClick={startRecording} disabled={isRecording}>
//                         {isRecording ? "🎤 Recording..." : "🎤 Start Recording"}
//                     </button>
//                     <button className={`stop-button ${isRecording ? "active" : ""}`} onClick={stopRecording} disabled={!isRecording}>
//                         ⏹ Stop Recording
//                     </button>
//                 </div>

//                 {/* Transcript Section */}
//                 <div className="transcript-container">
//                     <div className="transcript-header">
//                         <h3>Transcript</h3>
//                         <div className="transcript-actions">
//                             <button onClick={addNewLine} disabled={!transcript}>↩ Add New Line</button>
//                             <button onClick={removeLastWord} disabled={!transcript}>⬅ Remove Last Word</button>
//                         </div>
//                     </div>
//                     <pre
//             // Attach the ref to the transcript element
//             className="transcript-box"
//             contentEditable="true"
//              // Suppress React warning about contentEditable
//           >
//             {transcript || "Your transcript will appear here..."}
//           </pre>
//                 </div>

//                 {/* PDF Section */}
//                 <div className="pdf-section">
//                     <button className="pdf-button" onClick={generatePDF} disabled={!transcript}>📄 Generate PDF</button>
//                     {pdfLink && <a href={`http://localhost:5000/download/${pdfLink.split("/").pop()}`} download className="download-link">⬇ Download PDF</a>}
//                 </div>

//                 {/* Detailed Description Section */}
//                 <div className="description-section">
//                     <h2>Why Use SpeechNotes?</h2>
//                     <p>
//                         SpeechNotes is designed to make your life easier by converting your speech into accurate, editable text in real-time. Whether you're taking notes, transcribing meetings, or creating content, SpeechNotes is the perfect tool to enhance your productivity.
//                     </p>
//                     <h3>Key Features</h3>
//                     <ul>
//                         <li>🎤 **Real-Time Transcription**: Convert your speech into text instantly.</li>
//                         <li>📄 **Export to PDF**: Save your transcriptions as PDF documents with one click.</li>
//                         <li>🔒 **Secure & Private**: Your data is safe with industry-standard encryption.</li>
//                         <li>🌐 **Multi-Language Support**: Supports multiple languages for global users.</li>
//                         <li>📱 **Cross-Platform Compatibility**: Access SpeechNotes from any device.</li>
//                         <li>✏️ **Edit & Format**: Easily edit and format your transcriptions.</li>
//                     </ul>
//                     <h3>How It Works</h3>
//                     <p>
//                         1. **Start Recording**: Click the "Start Recording" button and begin speaking.<br />
//                         2. **View Transcript**: Your speech will appear as text in real-time.<br />
//                         3. **Edit & Save**: Edit your transcription and save it as a PDF or text file.
//                     </p>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default MainApp;











import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./MainApp.css";

const MainApp = () => {
  const [transcript, setTranscript] = useState("");
  const [transcripts, setTranscripts] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [pdfLink, setPdfLink] = useState("");
  const recognitionRef = useRef(null);
  const transcriptRef = useRef(null); // Ref to track the transcript element

  const clearTranscript = () => {
    setTranscript("");
    console.log("working");
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let newTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          newTranscript += event.results[i][0].transcript + " ";
        }
        setTranscript((prev) => prev + newTranscript);
        setTranscripts((prev) => newTranscript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognitionRef.current = recognition;
    } else {
      alert("Your browser does not support Speech Recognition. Try using Chrome.");
    }
  }, []);

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const removeLastWord = () => {
    setTranscript((prev) => {
      let words = prev.trim().split(" ");
      words.pop();
      return words.join(" ");
    });
  };

  const addNewLine = () => {
    setTranscript((prev) => prev + "\n");
  };

  const generatePDF = async () => {
    if (!transcript) return alert("No transcript available to generate PDF.");

    const response = await fetch("http://localhost:5000/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
    });

    const data = await response.json();
    setPdfLink(data.pdf);
  };

  // Handle changes in the contentEditable element
  const handleTranscriptChange = () => {
    if (transcriptRef.current) {
      setTranscript(transcriptRef.current.textContent); // Update the transcript state
    }
  };

  // Set the initial content of the contentEditable element
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.textContent = transcript || "Your transcript will appear here...";
    }
  }, [transcript]);

  return (
    <div className="main-app-container">
      <motion.div className="app-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        {/* Hero Section */}
        <div className="hero-section">
          <h1>Speech to Text</h1>
          <p id="p" className="p">{transcripts || "Start speaking, and your words will appear here."}</p>
        </div>

        {/* Recording Controls */}
        <div className="button-group">
          <button className={`start-button ${isRecording ? "disabled" : ""}`} onClick={startRecording} disabled={isRecording}>
            {isRecording ? "🎤 Recording..." : "🎤 Start Recording"}
          </button>
          <button className={`stop-button ${isRecording ? "active" : ""}`} onClick={stopRecording} disabled={!isRecording}>
            ⏹ Stop Recording
          </button>
        </div>

        {/* Transcript Section */}
        <div className="transcript-container">
          <div className="transcript-header">
            <h3>Transcript</h3>
            <div className="transcript-actions">
              <button onClick={addNewLine} disabled={!transcript}>↩ Add New Line</button>
              <button onClick={removeLastWord} disabled={!transcript}>⬅ Remove Last Word</button>
            </div>
          </div>
          <pre
            ref={transcriptRef} // Attach the ref to the transcript element
            className="transcript-box"
            contentEditable="true"
            onInput={handleTranscriptChange}
            suppressContentEditableWarning={true} // Suppress React warning about contentEditable
          />
        </div>

        {/* PDF Section */}
        <div className="pdf-section">
          <button className="pdf-button" onClick={generatePDF} disabled={!transcript}>📄 Generate PDF</button>
          {pdfLink && <a href={`http://localhost:5000/download/${pdfLink.split("/").pop()}`} download className="download-link">⬇ Download PDF</a>}
        </div>

        {/* Detailed Description Section */}
        <div className="description-section">
          <h2>Why Use SpeechNotes?</h2>
          <p>
            SpeechNotes is designed to make your life easier by converting your speech into accurate, editable text in real-time. Whether you're taking notes, transcribing meetings, or creating content, SpeechNotes is the perfect tool to enhance your productivity.
          </p>
          <h3>Key Features</h3>
          <ul>
            <li>🎤 **Real-Time Transcription**: Convert your speech into text instantly.</li>
            <li>📄 **Export to PDF**: Save your transcriptions as PDF documents with one click.</li>
            <li>🔒 **Secure & Private**: Your data is safe with industry-standard encryption.</li>
            <li>🌐 **Multi-Language Support**: Supports multiple languages for global users.</li>
            <li>📱 **Cross-Platform Compatibility**: Access SpeechNotes from any device.</li>
            <li>✏️ **Edit & Format**: Easily edit and format your transcriptions.</li>
          </ul>
          <h3>How It Works</h3>
          <p>
            1. **Start Recording**: Click the "Start Recording" button and begin speaking.<br />
            2. **View Transcript**: Your speech will appear as text in real-time.<br />
            3. **Edit & Save**: Edit your transcription and save it as a PDF or text file.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MainApp;