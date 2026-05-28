import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";
import { 
  FaMicrophone, 
  FaStop, 
  FaCopy, 
  FaCheck, 
  FaTrash, 
  FaDownload, 
  FaLanguage, 
  FaListUl, 
  FaInfoCircle
} from "react-icons/fa";
import "./MainApp.css";

const LANGUAGES = [
  { code: "en-US", name: "English (US)" },
  { code: "es-ES", name: "Español (España)" },
  { code: "fr-FR", name: "Français (France)" },
  { code: "de-DE", name: "Deutsch (Deutschland)" },
  { code: "ja-JP", name: "日本語 (日本)" },
  { code: "hi-IN", name: "हिन्दी (भारत)" },
  { code: "it-IT", name: "Italiano (Italia)" }
];

const MainApp = () => {
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en-US");
  const [copied, setCopied] = useState(false);
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState(true);
  const [lastCommand, setLastCommand] = useState("");

  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLang;

      recognition.onresult = (event) => {
        let finalTrans = "";
        let interimTrans = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const text = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            // Process Voice Commands if enabled
            if (voiceCommandsEnabled) {
              const commandText = text.trim().toLowerCase();
              if (commandText === "next line" || commandText === "new line") {
                finalTrans += "\n";
                triggerCommandFeedback("New Line ↩");
                continue;
              } else if (commandText === "clear transcript" || commandText === "clear notes") {
                setTranscript("");
                triggerCommandFeedback("Cleared 🗑");
                continue;
              } else if (commandText === "delete word" || commandText === "delete last word") {
                setTranscript((prev) => {
                  let words = prev.trim().split(" ");
                  words.pop();
                  return words.join(" ");
                });
                triggerCommandFeedback("Delete Last Word ⬅");
                continue;
              }
            }
            finalTrans += text + " ";
          } else {
            interimTrans += text;
          }
        }

        if (finalTrans) {
          setTranscript((prev) => prev + finalTrans);
        }
        setInterimTranscript(interimTrans);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          alert("Microphone access is blocked. Please check your browser microphone permissions.");
          setIsRecording(false);
        }
      };

      recognition.onend = () => {
        // Auto restart if state says isRecording is active (Chrome occasionally stops automatically)
        if (isRecording) {
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.error("Error restarting recognition:", e);
          }
        }
      };

      recognitionRef.current = recognition;
    } else {
      alert("Your browser does not support Speech Recognition. Try using Google Chrome.");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [selectedLang, voiceCommandsEnabled, isRecording]);

  // Adjust language when dropdown changes
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);
    if (isRecording) {
      // Temporarily stop to reset language and let onend auto-restart it
      recognitionRef.current.stop();
    }
  };

  const triggerCommandFeedback = (cmdName) => {
    setLastCommand(cmdName);
    setTimeout(() => {
      setLastCommand("");
    }, 2000);
  };

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      try {
        setInterimTranscript("");
        recognitionRef.current.lang = selectedLang;
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.error("Error starting speech recognition:", e);
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setInterimTranscript("");
    }
  };

  const removeLastWord = () => {
    setTranscript((prev) => {
      let words = prev.trim().split(/\s+/);
      words.pop();
      return words.join(" ");
    });
  };

  const addNewLine = () => {
    setTranscript((prev) => prev + "\n");
  };

  const clearTranscript = () => {
    if (window.confirm("Are you sure you want to clear the entire transcript?")) {
      setTranscript("");
      setInterimTranscript("");
    }
  };

  const copyToClipboard = () => {
    if (!transcript) return;
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatePDF = () => {
    if (!transcript) return alert("No transcript available to generate PDF.");
    
    // Create jsPDF Document (A4 portrait)
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // Color Palette
    const primaryColor = [109, 40, 217]; // Purple
    const grayText = [107, 114, 128];
    const darkText = [31, 41, 55];

    // Document Header Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("Voice2Text Transcript", 20, 25);

    // Decorative line
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.5);
    doc.line(20, 32, 190, 32);

    // Document metadata
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(grayText[0], grayText[1], grayText[2]);
    const dateStr = new Date().toLocaleDateString(undefined, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    doc.text(`Generated on: ${dateStr}`, 20, 40);

    const wCount = transcript.trim().split(/\s+/).filter(w => w.length > 0).length;
    const cCount = transcript.length;
    doc.text(`Stats: ${wCount} words | ${cCount} characters`, 20, 46);

    // Divider Line 2
    doc.line(20, 52, 190, 52);

    // Transcript Content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(darkText[0], darkText[1], darkText[2]);

    // Split text to fit inside bounds
    const splitText = doc.splitTextToSize(transcript, 170); // A4 standard width is 210mm. 20mm margin left/right = 170mm print width.
    
    let cursorY = 62;
    const pageHeight = 297;
    const marginBottom = 20;

    for (let i = 0; i < splitText.length; i++) {
      if (cursorY > pageHeight - marginBottom) {
        doc.addPage();
        cursorY = 25;
        
        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(0.5);
        doc.line(20, 15, 190, 15);
      }
      doc.text(splitText[i], 20, cursorY);
      cursorY += 6.5; // Line spacing
    }

    // Page numbering and branding
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(156, 163, 175);
      doc.text(`Page ${i} of ${pageCount}`, 105, 285, { align: "center" });
      doc.text("Generated by Voice2Text — Your ultimate note-taker", 20, 285);
    }

    // Trigger local download
    const filename = `Voice2Text_Notes_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(filename);
  };

  const wordCount = transcript.trim().split(/\s+/).filter(w => w.length > 0).length;
  const charCount = transcript.length;
  const estSpeakingMin = Math.ceil(wordCount / 130); // 130 words per minute average speaking rate

  return (
    <div className="main-app-container">
      <motion.div 
        className="app-content" 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        {/* Header Board */}
        <div className="app-hero-panel">
          <div className="panel-badge">Web Speech API Activated</div>
          <h1>Speech to Text Converter</h1>
          <p className="subtitle">Speak naturally, your words will appear below in real-time. Use voice commands to edit on-the-fly!</p>
          
          <AnimatePresence>
            {lastCommand && (
              <motion.div 
                className="voice-command-toast"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                Command Recognized: <strong>{lastCommand}</strong>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toolbar Settings */}
        <div className="toolbar-section">
          <div className="tool-control">
            <label><FaLanguage /> Speech Language</label>
            <select value={selectedLang} onChange={handleLanguageChange} disabled={isRecording} className="modern-select">
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>

          <div className="tool-control flex-row">
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={voiceCommandsEnabled} 
                onChange={(e) => setVoiceCommandsEnabled(e.target.checked)} 
              />
              <span className="slider"></span>
            </label>
            <span className="label-text">Enable Voice Commands <span className="tooltip-trigger" title="Voice Commands:\n- 'new line' or 'next line' (Inserts return)\n- 'clear notes' (Deletes all text)\n- 'delete word' (Backspaces last word)"><FaInfoCircle /></span></span>
          </div>
        </div>

        {/* Dynamic Waveform & Main Buttons */}
        <div className="recording-dashboard">
          <div className="button-group-row">
            {!isRecording ? (
              <button className="recording-btn start-rec" onClick={startRecording}>
                <span className="pulse-dot"></span>
                <FaMicrophone className="icon-pulse" /> Start Recording
              </button>
            ) : (
              <button className="recording-btn stop-rec" onClick={stopRecording}>
                <FaStop /> Stop Recording
              </button>
            )}
          </div>

          {/* Interactive Bouncing CSS Audio Waveform */}
          {isRecording && (
            <div className="audio-waveform-container">
              <span className="wave-bar bar-1"></span>
              <span className="wave-bar bar-2"></span>
              <span className="wave-bar bar-3"></span>
              <span className="wave-bar bar-4"></span>
              <span className="wave-bar bar-5"></span>
              <span className="wave-bar bar-6"></span>
              <span className="wave-bar bar-7"></span>
              <span className="wave-bar bar-8"></span>
              <span className="wave-text">Listening...</span>
            </div>
          )}
        </div>

        {/* Intermediate preview text display */}
        {isRecording && interimTranscript && (
          <div className="interim-stream-panel">
            <span className="preview-label">Live Preview:</span>
            <p className="preview-text">"{interimTranscript}"</p>
          </div>
        )}

        {/* Transcript Box Area */}
        <div className="transcript-wrapper">
          <div className="transcript-box-header">
            <div className="header-meta">
              <span className="badge-live">Editor</span>
            </div>
            
            <div className="editor-shortcut-actions">
              <button className="shortcut-btn" onClick={addNewLine} disabled={!transcript} title="Add New Line">
                ↩ Line
              </button>
              <button className="shortcut-btn" onClick={removeLastWord} disabled={!transcript} title="Remove Last Word">
                ⬅ Backspace
              </button>
              <button className="shortcut-btn copy-btn" onClick={copyToClipboard} disabled={!transcript}>
                {copied ? <><FaCheck className="green-icon" /> Copied!</> : <><FaCopy /> Copy</>}
              </button>
              <button className="shortcut-btn danger-btn" onClick={clearTranscript} disabled={!transcript} title="Clear Notes">
                <FaTrash /> Clear
              </button>
            </div>
          </div>

          <textarea 
            className="transcript-box-textarea"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your spoken transcript will appear here in real-time, or you can type, edit, and format notes directly inside this box..."
          />

          {/* Stats Bar */}
          <div className="transcript-box-footer-stats">
            <div className="stat-pill"><strong>{wordCount}</strong> words</div>
            <div className="stat-pill"><strong>{charCount}</strong> characters</div>
            <div className="stat-pill"><strong>{estSpeakingMin}</strong> min speaking estimation</div>
          </div>
        </div>

        {/* PDF Export Section */}
        <div className="pdf-generation-panel">
          <h2>Export & Save</h2>
          <p>Download your transcriptions as clean, beautifully structured PDF documents instantly. 100% serverless, secure, and generated inside your browser.</p>
          <button className="download-pdf-btn" onClick={generatePDF} disabled={!transcript}>
            <FaDownload /> Generate & Download PDF
          </button>
        </div>

        {/* Quick Help Guide Panel */}
        <div className="speech-guide-dashboard">
          <h3><FaListUl /> Voice Command Quick Reference</h3>
          <div className="commands-grid">
            <div className="command-card">
              <code>"next line"</code> or <code>"new line"</code>
              <p>Moves the cursor and begins writing on a new line.</p>
            </div>
            <div className="command-card">
              <code>"delete last word"</code> or <code>"delete word"</code>
              <p>Removes the absolute last word spoken or typed.</p>
            </div>
            <div className="command-card">
              <code>"clear transcript"</code> or <code>"clear notes"</code>
              <p>Instantly deletes everything in the transcript box.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MainApp;