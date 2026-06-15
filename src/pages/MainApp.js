import React, { useState, useEffect, useRef, useCallback } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import {
  FaBold, FaItalic, FaUnderline, FaStrikethrough,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify,
  FaListUl, FaListOl, FaIndent, FaOutdent,
  FaUndo, FaRedo,
  FaMicrophone, FaMicrophoneSlash,
  FaSearch, FaTimes, FaExchangeAlt,
  FaDownload, FaFilePdf, FaFileWord, FaFileAlt, FaPrint,
  FaPalette, FaHighlighter,
  FaImage, FaTable, FaLink, FaMinus,
  FaChevronDown, FaInfoCircle,
  FaShapes, FaCheck
} from "react-icons/fa";
import "./MainApp.css";

/* ─────────── Constants ─────────── */
const FONT_FAMILIES = [
  "Arial", "Times New Roman", "Courier New", "Georgia", "Verdana",
  "Trebuchet MS", "Palatino Linotype", "Garamond", "Comic Sans MS",
  "Impact", "Lucida Console", "Tahoma", "Calibri", "Cambria"
];

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 42, 48, 56, 64, 72];

const LANGUAGES = [
  { code: "en-US", name: "English (US)" },
  { code: "en-GB", name: "English (UK)" },
  { code: "es-ES", name: "Español" },
  { code: "fr-FR", name: "Français" },
  { code: "de-DE", name: "Deutsch" },
  { code: "ja-JP", name: "日本語" },
  { code: "hi-IN", name: "हिन्दी" },
  { code: "it-IT", name: "Italiano" },
  { code: "pt-BR", name: "Português" },
  { code: "zh-CN", name: "中文" },
  { code: "ko-KR", name: "한국어" },
  { code: "ar-SA", name: "العربية" },
  { code: "ru-RU", name: "Русский" },
  { code: "ur-PK", name: "اردو" }
];

const COLOR_PALETTE = [
  "#000000","#434343","#666666","#999999","#B7B7B7","#CCCCCC","#D9D9D9","#EFEFEF","#F3F3F3","#FFFFFF",
  "#980000","#FF0000","#FF9900","#FFFF00","#00FF00","#00FFFF","#4A86E8","#0000FF","#9900FF","#FF00FF",
  "#E6B8AF","#F4CCCC","#FCE5CD","#FFF2CC","#D9EAD3","#D0E0E3","#C9DAF8","#CFE2F3","#D9D2E9","#EAD1DC",
  "#DD7E6B","#EA9999","#F9CB9C","#FFE599","#B6D7A8","#A2C4C9","#A4C2F4","#9FC5E8","#B4A7D6","#D5A6BD",
  "#CC4125","#E06666","#F6B26B","#FFD966","#93C47D","#76A5AF","#6D9EEB","#6FA8DC","#8E7CC3","#C27BA0",
  "#A61C00","#CC0000","#E69138","#F1C232","#6AA84F","#45818E","#3C78D8","#3D85C6","#674EA7","#A64D79",
  "#85200C","#990000","#B45F06","#BF9000","#38761D","#134F5C","#1155CC","#0B5394","#351C75","#741B47"
];

const SHAPES_LIST = [
  { name: "Rectangle", svg: `<svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="116" height="76" rx="0" fill="#4A86E8" stroke="#2A56A8" stroke-width="2"/></svg>` },
  { name: "Rounded Rect", svg: `<svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="116" height="76" rx="12" fill="#6AA84F" stroke="#3A7820" stroke-width="2"/></svg>` },
  { name: "Circle", svg: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="48" fill="#E06666" stroke="#B03636" stroke-width="2"/></svg>` },
  { name: "Ellipse", svg: `<svg width="140" height="80" viewBox="0 0 140 80" xmlns="http://www.w3.org/2000/svg"><ellipse cx="70" cy="40" rx="68" ry="38" fill="#F6B26B" stroke="#C6823B" stroke-width="2"/></svg>` },
  { name: "Triangle", svg: `<svg width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg"><polygon points="60,5 115,95 5,95" fill="#8E7CC3" stroke="#5E4C93" stroke-width="2"/></svg>` },
  { name: "Diamond", svg: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,2 98,50 50,98 2,50" fill="#76A5AF" stroke="#46757F" stroke-width="2"/></svg>` },
  { name: "Star", svg: `<svg width="110" height="110" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg"><polygon points="55,5 68,40 105,40 75,62 85,98 55,78 25,98 35,62 5,40 42,40" fill="#FFD966" stroke="#CFA936" stroke-width="2"/></svg>` },
  { name: "Arrow Right", svg: `<svg width="140" height="70" viewBox="0 0 140 70" xmlns="http://www.w3.org/2000/svg"><polygon points="0,20 95,20 95,0 140,35 95,70 95,50 0,50" fill="#45818E" stroke="#25515E" stroke-width="2"/></svg>` },
  { name: "Arrow Left", svg: `<svg width="140" height="70" viewBox="0 0 140 70" xmlns="http://www.w3.org/2000/svg"><polygon points="140,20 45,20 45,0 0,35 45,70 45,50 140,50" fill="#A64D79" stroke="#761D49" stroke-width="2"/></svg>` },
  { name: "Pentagon", svg: `<svg width="110" height="110" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg"><polygon points="55,5 105,38 85,95 25,95 5,38" fill="#CC4125" stroke="#9C1105" stroke-width="2"/></svg>` },
  { name: "Hexagon", svg: `<svg width="120" height="104" viewBox="0 0 120 104" xmlns="http://www.w3.org/2000/svg"><polygon points="30,2 90,2 118,52 90,102 30,102 2,52" fill="#3C78D8" stroke="#1C48A8" stroke-width="2"/></svg>` },
  { name: "Heart", svg: `<svg width="110" height="100" viewBox="0 0 110 100" xmlns="http://www.w3.org/2000/svg"><path d="M55,95 C25,70 0,50 0,30 C0,10 15,0 30,0 C40,0 50,8 55,18 C60,8 70,0 80,0 C95,0 110,10 110,30 C110,50 85,70 55,95Z" fill="#E06666" stroke="#B03636" stroke-width="2"/></svg>` },
  { name: "Speech Bubble", svg: `<svg width="140" height="100" viewBox="0 0 140 100" xmlns="http://www.w3.org/2000/svg"><path d="M10,10 H130 Q138,10 138,18 V62 Q138,70 130,70 H50 L25,95 L30,70 H10 Q2,70 2,62 V18 Q2,10 10,10Z" fill="#C9DAF8" stroke="#7999C8" stroke-width="2"/></svg>` },
  { name: "Cloud", svg: `<svg width="140" height="90" viewBox="0 0 140 90" xmlns="http://www.w3.org/2000/svg"><path d="M30,80 C10,80 0,65 5,50 C-5,35 10,15 30,20 C35,5 55,0 70,10 C85,0 110,5 115,25 C135,20 145,40 135,55 C145,70 130,85 110,80Z" fill="#D0E0E3" stroke="#A0B0B3" stroke-width="2"/></svg>` }
];

/* ─────────── Main Component ─────────── */
const MainApp = () => {
  /* State */
  const [docTitle, setDocTitle] = useState("Untitled Document");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en-US");
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState(true);
  const [lastCommand, setLastCommand] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");

  const [currentFont, setCurrentFont] = useState("Arial");
  const [currentSize, setCurrentSize] = useState(12);
  const [activeFormats, setActiveFormats] = useState({});

  const [showFindBar, setShowFindBar] = useState(false);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");

  const [showColorPicker, setShowColorPicker] = useState(null); // 'fore' | 'back' | null
  const [showTablePicker, setShowTablePicker] = useState(false);
  const [showShapePicker, setShowShapePicker] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showHeadingMenu, setShowHeadingMenu] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const [tableHover, setTableHover] = useState({ r: 0, c: 0 });

  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);

  /* Refs */
  const editorRef = useRef(null);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);
  const savedRangeRef = useRef(null);
  const isRecordingRef = useRef(false);

  /* ─────── Selection Save/Restore ─────── */
  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0 && editorRef.current && editorRef.current.contains(sel.anchorNode)) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
  }, []);

  const restoreSelection = useCallback(() => {
    if (savedRangeRef.current) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }
  }, []);

  /* ─────── Active Formatting Detection ─────── */
  const updateActiveFormats = useCallback(() => {
    const formats = {};
    try {
      formats.bold = document.queryCommandState("bold");
      formats.italic = document.queryCommandState("italic");
      formats.underline = document.queryCommandState("underline");
      formats.strikethrough = document.queryCommandState("strikeThrough");
      formats.justifyLeft = document.queryCommandState("justifyLeft");
      formats.justifyCenter = document.queryCommandState("justifyCenter");
      formats.justifyRight = document.queryCommandState("justifyRight");
      formats.justifyFull = document.queryCommandState("justifyFull");
      formats.insertUnorderedList = document.queryCommandState("insertUnorderedList");
      formats.insertOrderedList = document.queryCommandState("insertOrderedList");

      const fontName = document.queryCommandValue("fontName");
      if (fontName) setCurrentFont(fontName.replace(/['"]/g, ""));
      const fontSize = document.queryCommandValue("fontSize");
      if (fontSize) {
        const sizeMap = { 1: 8, 2: 10, 3: 12, 4: 14, 5: 18, 6: 24, 7: 36 };
        setCurrentSize(sizeMap[fontSize] || 12);
      }
    } catch (e) { /* ignore */ }
    setActiveFormats(formats);
  }, []);

  /* ─────── Word/Char/Line Count ─────── */
  const updateCounts = useCallback(() => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText || "";
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
    setCharCount(text.length);
    setLineCount(text.split("\n").length);
  }, []);

  /* ─────── Editor Event Handlers ─────── */
  const handleEditorInput = useCallback(() => {
    updateCounts();
    updateActiveFormats();
  }, [updateCounts, updateActiveFormats]);

  const handleEditorSelect = useCallback(() => {
    saveSelection();
    updateActiveFormats();
  }, [saveSelection, updateActiveFormats]);

  const handleEditorKeyDown = useCallback((e) => {
    // Keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'f') { e.preventDefault(); setShowFindBar(true); }
    }
    // Tab key to insert tab spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertHTML', false, '&emsp;&emsp;');
    }
  }, []);

  /* ─────── Format Execution ─────── */
  const execFormat = useCallback((command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    updateActiveFormats();
    updateCounts();
    saveSelection();
  }, [updateActiveFormats, updateCounts, saveSelection]);

  /* ─────── Font & Size Handlers ─────── */
  const handleFontChange = (e) => {
    const font = e.target.value;
    setCurrentFont(font);
    editorRef.current?.focus();
    document.execCommand("fontName", false, font);
    saveSelection();
  };

  const handleSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setCurrentSize(size);
    // execCommand fontSize only accepts 1-7, so use custom approach
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (sel.rangeCount > 0 && !sel.isCollapsed) {
      const range = sel.getRangeAt(0);
      const span = document.createElement("span");
      span.style.fontSize = size + "pt";
      range.surroundContents(span);
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      // For collapsed selection, insert a span with the size
      const span = document.createElement("span");
      span.style.fontSize = size + "pt";
      span.innerHTML = "&#8203;"; // zero-width space
      const range = sel.getRangeAt(0);
      range.insertNode(span);
      range.setStartAfter(span);
      range.setEndAfter(span);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    saveSelection();
  };

  /* ─────── Color Handlers ─────── */
  const applyColor = (color, type) => {
    editorRef.current?.focus();
    restoreSelection();
    if (type === 'fore') {
      document.execCommand("foreColor", false, color);
    } else {
      document.execCommand("hiliteColor", false, color);
    }
    setShowColorPicker(null);
    saveSelection();
  };

  /* ─────── Heading Handler ─────── */
  const applyHeading = (tag) => {
    editorRef.current?.focus();
    restoreSelection();
    if (tag === "P") {
      document.execCommand("formatBlock", false, "P");
    } else {
      document.execCommand("formatBlock", false, tag);
    }
    setShowHeadingMenu(false);
    saveSelection();
  };

  /* ─────── Insert Image ─────── */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      editorRef.current?.focus();
      restoreSelection();
      const html = `<div class="inserted-image-wrapper" contenteditable="false" style="text-align:center;margin:16px 0;"><img src="${ev.target.result}" style="max-width:100%;height:auto;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,0.15);" alt="Inserted image" /></div>`;
      document.execCommand("insertHTML", false, html);
      updateCounts();
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  /* ─────── Insert Shape ─────── */
  const insertShape = (shape) => {
    editorRef.current?.focus();
    restoreSelection();
    const html = `<div class="inserted-shape-wrapper" contenteditable="false" style="text-align:center;margin:16px 0;display:inline-block;">${shape.svg}</div>&nbsp;`;
    document.execCommand("insertHTML", false, html);
    setShowShapePicker(false);
    updateCounts();
  };

  /* ─────── Insert Table ─────── */
  const insertTable = (rows, cols) => {
    editorRef.current?.focus();
    restoreSelection();
    let tableHTML = '<table class="editor-table" style="border-collapse:collapse;width:100%;margin:16px 0;">';
    for (let r = 0; r < rows; r++) {
      tableHTML += "<tr>";
      for (let c = 0; c < cols; c++) {
        tableHTML += `<td style="border:1px solid #ccc;padding:8px 12px;min-width:60px;" contenteditable="true">&nbsp;</td>`;
      }
      tableHTML += "</tr>";
    }
    tableHTML += "</table><p><br/></p>";
    document.execCommand("insertHTML", false, tableHTML);
    setShowTablePicker(false);
    updateCounts();
  };

  /* ─────── Insert Link ─────── */
  const insertLink = () => {
    if (!linkUrl) return;
    editorRef.current?.focus();
    restoreSelection();
    const label = linkLabel || linkUrl;
    const html = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" style="color:#1a73e8;text-decoration:underline;">${label}</a>&nbsp;`;
    document.execCommand("insertHTML", false, html);
    setShowLinkModal(false);
    setLinkUrl("");
    setLinkLabel("");
  };

  /* ─────── Insert Horizontal Rule ─────── */
  const insertHR = () => {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand("insertHTML", false, '<hr style="border:none;border-top:2px solid #e0e0e0;margin:20px 0;" /><p><br/></p>');
  };

  /* ─────── Find & Replace ─────── */
  const handleFindNext = () => {
    if (!findText) return;
    window.find(findText, false, false, true, false, false, false);
  };

  const handleReplace = () => {
    const sel = window.getSelection();
    if (sel.toString().toLowerCase() === findText.toLowerCase()) {
      document.execCommand("insertText", false, replaceText);
    }
    handleFindNext();
  };

  const handleReplaceAll = () => {
    if (!findText || !editorRef.current) return;
    const walker = document.createTreeWalker(editorRef.current, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    nodes.forEach(node => {
      if (node.textContent.match(regex)) {
        node.textContent = node.textContent.replace(regex, replaceText);
      }
    });
    updateCounts();
  };

  /* ─────── Export Functions ─────── */
  const exportPDF = async () => {
    if (!editorRef.current) return;
    setShowExportMenu(false);
    try {
      const canvas = await html2canvas(editorRef.current, {
        scale: 2, useCORS: true, backgroundColor: "#ffffff", logging: false
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = 210;
      const pageH = 297;
      const imgW = pageW;
      const imgH = (canvas.height * imgW) / canvas.width;

      let heightLeft = imgH;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgW, imgH);
      heightLeft -= pageH;
      while (heightLeft > 0) {
        position -= pageH;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgW, imgH);
        heightLeft -= pageH;
      }

      // Page numbers
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150);
        pdf.text(`${docTitle} — Page ${i} of ${pageCount}`, 105, 290, { align: "center" });
      }
      pdf.save(`${docTitle.replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error("PDF export error:", err);
      alert("Failed to export PDF. Please try again.");
    }
  };

  const exportDOCX = () => {
    setShowExportMenu(false);
    if (!editorRef.current) return;
    const htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8"><title>${docTitle}</title>
      <style>body{font-family:Arial,sans-serif;font-size:12pt;line-height:1.6;margin:1in;}
      table{border-collapse:collapse;width:100%;}td{border:1px solid #ccc;padding:8px;}
      img{max-width:100%;height:auto;}</style></head>
      <body>${editorRef.current.innerHTML}</body></html>`;
    const blob = new Blob(["\ufeff", htmlContent], { type: "application/msword" });
    saveAs(blob, `${docTitle.replace(/\s+/g, "_")}.doc`);
  };

  const exportTXT = () => {
    setShowExportMenu(false);
    if (!editorRef.current) return;
    const text = editorRef.current.innerText;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${docTitle.replace(/\s+/g, "_")}.txt`);
  };

  const printDocument = () => {
    setShowExportMenu(false);
    const content = editorRef.current?.innerHTML;
    if (!content) return;
    const printWin = window.open("", "_blank");
    printWin.document.write(`
      <html><head><title>${docTitle}</title>
      <style>
        body{font-family:Arial,sans-serif;font-size:12pt;line-height:1.6;margin:1in;color:#000;}
        table{border-collapse:collapse;width:100%;}td{border:1px solid #ccc;padding:8px;}
        img{max-width:100%;height:auto;}
        @page{margin:1in;}
      </style></head>
      <body>${content}</body></html>`);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => { printWin.print(); printWin.close(); }, 500);
  };

  /* ─────── Voice Command Feedback ─────── */
  const triggerCommandFeedback = (cmdName) => {
    setLastCommand(cmdName);
    setTimeout(() => setLastCommand(""), 2000);
  };

  /* ─────── Insert Text at Cursor ─────── */
  const insertTextAtCursor = useCallback((text) => {
    editorRef.current?.focus();
    if (savedRangeRef.current) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }
    document.execCommand("insertText", false, text);
    // Save the new cursor position
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
  }, []);

  /* ─────── Speech Recognition ─────── */
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLang;

    recognition.onresult = (event) => {
      let interimTrans = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          if (voiceCommandsEnabled) {
            const cmd = text.trim().toLowerCase();

            // Voice commands
            if (cmd === "new line" || cmd === "next line") {
              insertTextAtCursor("\n");
              triggerCommandFeedback("New Line ↩");
              continue;
            } else if (cmd === "new paragraph") {
              editorRef.current?.focus();
              document.execCommand("insertParagraph", false, null);
              triggerCommandFeedback("New Paragraph ¶");
              continue;
            } else if (cmd === "delete last word" || cmd === "delete word") {
              editorRef.current?.focus();
              document.execCommand("delete", false, null);
              triggerCommandFeedback("Delete Word ⬅");
              continue;
            } else if (cmd === "clear all" || cmd === "clear document") {
              if (editorRef.current) editorRef.current.innerHTML = "<p><br/></p>";
              triggerCommandFeedback("Document Cleared 🗑");
              continue;
            } else if (cmd === "bold" || cmd === "toggle bold") {
              execFormat("bold");
              triggerCommandFeedback("Bold Toggle B");
              continue;
            } else if (cmd === "italic" || cmd === "toggle italic") {
              execFormat("italic");
              triggerCommandFeedback("Italic Toggle I");
              continue;
            } else if (cmd === "underline" || cmd === "toggle underline") {
              execFormat("underline");
              triggerCommandFeedback("Underline Toggle U");
              continue;
            } else if (cmd === "heading one" || cmd === "heading 1") {
              execFormat("formatBlock", "H1");
              triggerCommandFeedback("Heading 1");
              continue;
            } else if (cmd === "heading two" || cmd === "heading 2") {
              execFormat("formatBlock", "H2");
              triggerCommandFeedback("Heading 2");
              continue;
            } else if (cmd === "heading three" || cmd === "heading 3") {
              execFormat("formatBlock", "H3");
              triggerCommandFeedback("Heading 3");
              continue;
            } else if (cmd === "bullet list" || cmd === "bullets") {
              execFormat("insertUnorderedList");
              triggerCommandFeedback("Bullet List •");
              continue;
            } else if (cmd === "numbered list" || cmd === "number list") {
              execFormat("insertOrderedList");
              triggerCommandFeedback("Numbered List 1.");
              continue;
            } else if (cmd === "undo") {
              execFormat("undo");
              triggerCommandFeedback("Undo ↶");
              continue;
            } else if (cmd === "redo") {
              execFormat("redo");
              triggerCommandFeedback("Redo ↷");
              continue;
            } else if (cmd === "align left") {
              execFormat("justifyLeft");
              triggerCommandFeedback("Align Left");
              continue;
            } else if (cmd === "align center" || cmd === "centre") {
              execFormat("justifyCenter");
              triggerCommandFeedback("Align Center");
              continue;
            } else if (cmd === "align right") {
              execFormat("justifyRight");
              triggerCommandFeedback("Align Right");
              continue;
            }
            // Punctuation commands
            else if (cmd === "period" || cmd === "full stop") {
              insertTextAtCursor(".");
              triggerCommandFeedback("Period .");
              continue;
            } else if (cmd === "comma") {
              insertTextAtCursor(",");
              triggerCommandFeedback("Comma ,");
              continue;
            } else if (cmd === "question mark") {
              insertTextAtCursor("?");
              triggerCommandFeedback("Question ?");
              continue;
            } else if (cmd === "exclamation mark" || cmd === "exclamation point") {
              insertTextAtCursor("!");
              triggerCommandFeedback("Exclamation !");
              continue;
            } else if (cmd === "colon") {
              insertTextAtCursor(":");
              triggerCommandFeedback("Colon :");
              continue;
            } else if (cmd === "semicolon") {
              insertTextAtCursor(";");
              triggerCommandFeedback("Semicolon ;");
              continue;
            } else if (cmd === "open quote" || cmd === "open quotation") {
              insertTextAtCursor('"');
              triggerCommandFeedback('Open Quote "');
              continue;
            } else if (cmd === "close quote" || cmd === "close quotation") {
              insertTextAtCursor('"');
              triggerCommandFeedback('Close Quote "');
              continue;
            }
          }
          // Normal text — insert at cursor
          insertTextAtCursor(text + " ");
        } else {
          interimTrans += text;
        }
      }
      setInterimTranscript(interimTrans);
      updateCounts();
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "not-allowed") {
        alert("Microphone access is blocked. Please check browser permissions.");
        setIsRecording(false);
        isRecordingRef.current = false;
      }
    };

    recognition.onend = () => {
      if (isRecordingRef.current) {
        try { recognitionRef.current?.start(); } catch (e) { /* ignore */ }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      try { recognitionRef.current?.stop(); } catch (e) { /* ignore */ }
    };
  }, [selectedLang, voiceCommandsEnabled, execFormat, insertTextAtCursor, updateCounts]);

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      try {
        setInterimTranscript("");
        recognitionRef.current.lang = selectedLang;
        recognitionRef.current.start();
        setIsRecording(true);
        isRecordingRef.current = true;
      } catch (e) {
        console.error("Error starting speech recognition:", e);
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      isRecordingRef.current = false;
      setInterimTranscript("");
    }
  };

  /* ─────── Close dropdowns on outside click ─────── */
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".dropdown-wrapper")) {
        setShowColorPicker(null);
        setShowTablePicker(false);
        setShowShapePicker(false);
        setShowExportMenu(false);
        setShowHeadingMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ─────── Initialize Editor ─────── */
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML.trim()) {
      editorRef.current.innerHTML = "<p><br/></p>";
    }
    updateCounts();
  }, [updateCounts]);

  /* ══════════════════════ RENDER ══════════════════════ */
  return (
    <div className="doc-editor-container">
      {/* ─── Top Title Bar ─── */}
      <div className="doc-title-bar">
        <div className="doc-title-left">
          <div className="doc-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" fill="#6d28d9"/><path d="M7 8h10M7 12h8M7 16h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <input
            className="doc-title-input"
            type="text"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            placeholder="Untitled Document"
          />
        </div>
        <div className="doc-title-right">
          {isRecording && (
            <div className="recording-indicator">
              <span className="rec-dot"></span>
              <span>Recording</span>
            </div>
          )}
          {lastCommand && (
            <div className="command-toast">
              <FaCheck /> {lastCommand}
            </div>
          )}
        </div>
      </div>

      {/* ─── Toolbar Ribbon ─── */}
      <div className="doc-toolbar">
        {/* Undo / Redo */}
        <div className="toolbar-group">
          <button className="tb-btn" onMouseDown={e => e.preventDefault()} onClick={() => execFormat("undo")} title="Undo (Ctrl+Z)"><FaUndo /></button>
          <button className="tb-btn" onMouseDown={e => e.preventDefault()} onClick={() => execFormat("redo")} title="Redo (Ctrl+Y)"><FaRedo /></button>
        </div>
        <div className="toolbar-divider" />

        {/* Font Family & Size */}
        <div className="toolbar-group">
          <select className="tb-select font-select" value={currentFont} onChange={handleFontChange} onMouseDown={saveSelection} title="Font Family">
            {FONT_FAMILIES.map(f => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
          </select>
          <select className="tb-select size-select" value={currentSize} onChange={handleSizeChange} onMouseDown={saveSelection} title="Font Size">
            {FONT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="toolbar-divider" />

        {/* Text Style */}
        <div className="toolbar-group">
          <button className={`tb-btn ${activeFormats.bold ? 'active' : ''}`} onMouseDown={e => e.preventDefault()} onClick={() => execFormat("bold")} title="Bold (Ctrl+B)"><FaBold /></button>
          <button className={`tb-btn ${activeFormats.italic ? 'active' : ''}`} onMouseDown={e => e.preventDefault()} onClick={() => execFormat("italic")} title="Italic (Ctrl+I)"><FaItalic /></button>
          <button className={`tb-btn ${activeFormats.underline ? 'active' : ''}`} onMouseDown={e => e.preventDefault()} onClick={() => execFormat("underline")} title="Underline (Ctrl+U)"><FaUnderline /></button>
          <button className={`tb-btn ${activeFormats.strikethrough ? 'active' : ''}`} onMouseDown={e => e.preventDefault()} onClick={() => execFormat("strikeThrough")} title="Strikethrough"><FaStrikethrough /></button>
        </div>
        <div className="toolbar-divider" />

        {/* Colors */}
        <div className="toolbar-group">
          <div className="dropdown-wrapper">
            <button className="tb-btn color-btn" onMouseDown={e => { e.preventDefault(); saveSelection(); }} onClick={() => setShowColorPicker(showColorPicker === 'fore' ? null : 'fore')} title="Text Color">
              <FaPalette /><FaChevronDown className="chevron" />
            </button>
            {showColorPicker === 'fore' && (
              <div className="color-picker-dropdown">
                <div className="color-picker-label">Text Color</div>
                <div className="color-grid">
                  {COLOR_PALETTE.map(c => (
                    <button key={c} className="color-swatch" style={{ background: c }} onClick={() => applyColor(c, 'fore')} title={c} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="dropdown-wrapper">
            <button className="tb-btn color-btn" onMouseDown={e => { e.preventDefault(); saveSelection(); }} onClick={() => setShowColorPicker(showColorPicker === 'back' ? null : 'back')} title="Highlight Color">
              <FaHighlighter /><FaChevronDown className="chevron" />
            </button>
            {showColorPicker === 'back' && (
              <div className="color-picker-dropdown">
                <div className="color-picker-label">Highlight Color</div>
                <div className="color-grid">
                  {COLOR_PALETTE.map(c => (
                    <button key={c} className="color-swatch" style={{ background: c }} onClick={() => applyColor(c, 'back')} title={c} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="toolbar-divider" />

        {/* Alignment */}
        <div className="toolbar-group">
          <button className={`tb-btn ${activeFormats.justifyLeft ? 'active' : ''}`} onMouseDown={e => e.preventDefault()} onClick={() => execFormat("justifyLeft")} title="Align Left"><FaAlignLeft /></button>
          <button className={`tb-btn ${activeFormats.justifyCenter ? 'active' : ''}`} onMouseDown={e => e.preventDefault()} onClick={() => execFormat("justifyCenter")} title="Align Center"><FaAlignCenter /></button>
          <button className={`tb-btn ${activeFormats.justifyRight ? 'active' : ''}`} onMouseDown={e => e.preventDefault()} onClick={() => execFormat("justifyRight")} title="Align Right"><FaAlignRight /></button>
          <button className={`tb-btn ${activeFormats.justifyFull ? 'active' : ''}`} onMouseDown={e => e.preventDefault()} onClick={() => execFormat("justifyFull")} title="Justify"><FaAlignJustify /></button>
        </div>
        <div className="toolbar-divider" />

        {/* Lists & Indent */}
        <div className="toolbar-group">
          <button className={`tb-btn ${activeFormats.insertUnorderedList ? 'active' : ''}`} onMouseDown={e => e.preventDefault()} onClick={() => execFormat("insertUnorderedList")} title="Bullet List"><FaListUl /></button>
          <button className={`tb-btn ${activeFormats.insertOrderedList ? 'active' : ''}`} onMouseDown={e => e.preventDefault()} onClick={() => execFormat("insertOrderedList")} title="Numbered List"><FaListOl /></button>
          <button className="tb-btn" onMouseDown={e => e.preventDefault()} onClick={() => execFormat("outdent")} title="Decrease Indent"><FaOutdent /></button>
          <button className="tb-btn" onMouseDown={e => e.preventDefault()} onClick={() => execFormat("indent")} title="Increase Indent"><FaIndent /></button>
        </div>
        <div className="toolbar-divider" />

        {/* Headings */}
        <div className="toolbar-group">
          <div className="dropdown-wrapper">
            <button className="tb-btn tb-btn-wide" onMouseDown={e => { e.preventDefault(); saveSelection(); }} onClick={() => setShowHeadingMenu(!showHeadingMenu)} title="Heading Style">
              Heading <FaChevronDown className="chevron" />
            </button>
            {showHeadingMenu && (
              <div className="heading-dropdown">
                <button className="heading-opt h1-opt" onClick={() => applyHeading("H1")}>Heading 1</button>
                <button className="heading-opt h2-opt" onClick={() => applyHeading("H2")}>Heading 2</button>
                <button className="heading-opt h3-opt" onClick={() => applyHeading("H3")}>Heading 3</button>
                <button className="heading-opt h4-opt" onClick={() => applyHeading("H4")}>Heading 4</button>
                <button className="heading-opt" onClick={() => applyHeading("P")}>Normal Text</button>
              </div>
            )}
          </div>
        </div>
        <div className="toolbar-divider" />

        {/* Insert: Image, Shape, Table, Link, HR */}
        <div className="toolbar-group">
          <button className="tb-btn" onMouseDown={e => e.preventDefault()} onClick={() => { saveSelection(); fileInputRef.current?.click(); }} title="Insert Image"><FaImage /></button>
          <input type="file" ref={fileInputRef} accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />

          <div className="dropdown-wrapper">
            <button className="tb-btn" onMouseDown={e => { e.preventDefault(); saveSelection(); }} onClick={() => setShowShapePicker(!showShapePicker)} title="Insert Shape"><FaShapes /></button>
            {showShapePicker && (
              <div className="shape-picker-dropdown">
                <div className="shape-picker-label">Insert Shape</div>
                <div className="shape-grid">
                  {SHAPES_LIST.map((s, i) => (
                    <button key={i} className="shape-option" onClick={() => insertShape(s)} title={s.name}>
                      <div className="shape-preview" dangerouslySetInnerHTML={{ __html: s.svg.replace(/width="[^"]*"/, 'width="36"').replace(/height="[^"]*"/, 'height="28"') }} />
                      <span className="shape-name">{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="dropdown-wrapper">
            <button className="tb-btn" onMouseDown={e => { e.preventDefault(); saveSelection(); }} onClick={() => setShowTablePicker(!showTablePicker)} title="Insert Table"><FaTable /></button>
            {showTablePicker && (
              <div className="table-picker-dropdown">
                <div className="table-picker-label">Insert Table</div>
                <div className="table-grid-picker">
                  {Array.from({ length: 8 }, (_, r) =>
                    Array.from({ length: 8 }, (_, c) => (
                      <div
                        key={`${r}-${c}`}
                        className={`table-cell-pick ${r <= tableHover.r && c <= tableHover.c ? "highlighted" : ""}`}
                        onMouseEnter={() => setTableHover({ r, c })}
                        onClick={() => insertTable(r + 1, c + 1)}
                      />
                    ))
                  )}
                </div>
                <div className="table-size-label">{tableHover.r + 1} × {tableHover.c + 1}</div>
              </div>
            )}
          </div>

          <button className="tb-btn" onMouseDown={e => { e.preventDefault(); saveSelection(); }} onClick={() => setShowLinkModal(true)} title="Insert Link"><FaLink /></button>
          <button className="tb-btn" onMouseDown={e => { e.preventDefault(); saveSelection(); }} onClick={insertHR} title="Horizontal Rule"><FaMinus /></button>
        </div>
        <div className="toolbar-divider" />

        {/* Find & Replace */}
        <div className="toolbar-group">
          <button className="tb-btn" onMouseDown={e => e.preventDefault()} onClick={() => setShowFindBar(!showFindBar)} title="Find & Replace (Ctrl+F)"><FaSearch /></button>
        </div>
        <div className="toolbar-divider" />

        {/* Voice Controls */}
        <div className="toolbar-group voice-group">
          {!isRecording ? (
            <button className="tb-btn voice-start-btn" onClick={startRecording} title="Start Voice Typing">
              <FaMicrophone /> <span className="btn-label">Voice</span>
            </button>
          ) : (
            <button className="tb-btn voice-stop-btn" onClick={stopRecording} title="Stop Voice Typing">
              <FaMicrophoneSlash /> <span className="btn-label">Stop</span>
            </button>
          )}
          <select className="tb-select lang-select" value={selectedLang} onChange={e => { setSelectedLang(e.target.value); if (isRecording) { stopRecording(); setTimeout(() => startRecording(), 300); } }} title="Speech Language">
            {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
          </select>
          <label className="vc-toggle" title="Voice Commands">
            <input type="checkbox" checked={voiceCommandsEnabled} onChange={e => setVoiceCommandsEnabled(e.target.checked)} />
            <span className="vc-slider"></span>
            <span className="vc-label">VC</span>
          </label>
        </div>
        <div className="toolbar-divider" />

        {/* Export */}
        <div className="toolbar-group">
          <div className="dropdown-wrapper">
            <button className="tb-btn tb-btn-accent" onMouseDown={e => e.preventDefault()} onClick={() => setShowExportMenu(!showExportMenu)} title="Export Document">
              <FaDownload /> <span className="btn-label">Export</span> <FaChevronDown className="chevron" />
            </button>
            {showExportMenu && (
              <div className="export-dropdown">
                <button className="export-opt" onClick={exportPDF}><FaFilePdf className="opt-icon pdf-icon" /> Export as PDF</button>
                <button className="export-opt" onClick={exportDOCX}><FaFileWord className="opt-icon word-icon" /> Export as Word (.doc)</button>
                <button className="export-opt" onClick={exportTXT}><FaFileAlt className="opt-icon txt-icon" /> Export as Text (.txt)</button>
                <div className="export-divider" />
                <button className="export-opt" onClick={printDocument}><FaPrint className="opt-icon print-icon" /> Print Document</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Find & Replace Bar ─── */}
      {showFindBar && (
        <div className="find-replace-bar">
          <div className="find-replace-inputs">
            <div className="fr-field">
              <FaSearch className="fr-icon" />
              <input type="text" placeholder="Find..." value={findText} onChange={e => setFindText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleFindNext()} autoFocus />
            </div>
            <div className="fr-field">
              <FaExchangeAlt className="fr-icon" />
              <input type="text" placeholder="Replace with..." value={replaceText} onChange={e => setReplaceText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleReplace()} />
            </div>
          </div>
          <div className="fr-actions">
            <button className="fr-btn" onClick={handleFindNext}>Find Next</button>
            <button className="fr-btn" onClick={handleReplace}>Replace</button>
            <button className="fr-btn" onClick={handleReplaceAll}>Replace All</button>
            <button className="fr-close" onClick={() => setShowFindBar(false)}><FaTimes /></button>
          </div>
        </div>
      )}

      {/* ─── Interim Voice Preview ─── */}
      {isRecording && interimTranscript && (
        <div className="voice-interim-bar">
          <span className="interim-label">🎙 Live:</span>
          <span className="interim-text">{interimTranscript}</span>
        </div>
      )}

      {/* ─── Voice Waveform ─── */}
      {isRecording && (
        <div className="voice-waveform-strip">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className={`wave-bar wb-${i}`} />
          ))}
          <span className="wave-label">Listening...</span>
        </div>
      )}

      {/* ─── Document Canvas ─── */}
      <div className="doc-canvas-wrapper">
        <div
          ref={editorRef}
          className="doc-page"
          contentEditable
          suppressContentEditableWarning
          onInput={handleEditorInput}
          onSelect={handleEditorSelect}
          onKeyDown={handleEditorKeyDown}
          spellCheck
          data-placeholder="Start typing or use voice to dictate your document..."
        />
      </div>

      {/* ─── Status Bar ─── */}
      <div className="doc-status-bar">
        <div className="status-left">
          <span className="status-item"><strong>{wordCount}</strong> words</span>
          <span className="status-item"><strong>{charCount}</strong> characters</span>
          <span className="status-item"><strong>{lineCount}</strong> lines</span>
          <span className="status-item"><strong>{Math.max(1, Math.ceil(lineCount / 45))}</strong> pages (est.)</span>
        </div>
        <div className="status-center">
          {isRecording && <span className="status-recording"><span className="rec-dot-sm"></span> Voice Active — {LANGUAGES.find(l => l.code === selectedLang)?.name}</span>}
        </div>
        <div className="status-right">
          <span className="status-item">{currentFont}, {currentSize}pt</span>
          <span className="status-item voice-cmd-info" title="Say 'bold', 'italic', 'new line', 'heading one', 'period', etc."><FaInfoCircle /> {voiceCommandsEnabled ? "VC On" : "VC Off"}</span>
        </div>
      </div>

      {/* ─── Link Modal ─── */}
      {showLinkModal && (
        <div className="modal-overlay" onClick={() => setShowLinkModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3>Insert Link</h3>
            <div className="modal-field">
              <label>URL</label>
              <input type="url" placeholder="https://example.com" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} autoFocus />
            </div>
            <div className="modal-field">
              <label>Display Text (optional)</label>
              <input type="text" placeholder="Link text" value={linkLabel} onChange={e => setLinkLabel(e.target.value)} />
            </div>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setShowLinkModal(false)}>Cancel</button>
              <button className="modal-confirm" onClick={insertLink}>Insert</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainApp;