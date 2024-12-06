import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FaCopy, FaDownload } from "react-icons/fa";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "highlight.js/styles/github.css";

export default function Notes({ content }) {
  const [isDownloading, setIsDownloading] = useState(false); // state to track downloading status

  const handleCopy = () => {
    if (!content) {
      alert("Nothing to copy!");
      return;
    }
    navigator.clipboard
      .writeText(content)
      .then(() => alert("Notes copied to clipboard!"))
      .catch(() => alert("Failed to copy notes."));
  };

  const handleDownloadPDF = async () => {
    if (!content) {
      alert("Nothing to download!");
      return;
    }
    setIsDownloading(true); // start loading
  
    const element = document.getElementById("markdown-content");
    const isDarkMode = document.body.classList.contains("dark"); // Check if dark mode is active
    element.style.padding ="20px"
    // Temporarily apply inline styles for dark mode
    if (isDarkMode) {
      console.log("add colors")
      element.style.backgroundColor = "#121212"; // Dark mode background color
      element.style.color = "#ffffff"; // Dark mode text color
    }
  
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("notes.pdf");
    } catch (error) {
      alert("Failed to download PDF.");
    } finally {
      // Remove inline styles after download
      if (isDarkMode) {
        element.style.backgroundColor = "";
        element.style.color = "";
      }
      setIsDownloading(false); // stop loading
      element.style.padding =""
    }
  };
  

  return (
    <div className="flex flex-col gap-4">
      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <button
          onClick={handleCopy}
          disabled={!content}
          className={`flex items-center gap-2 px-4 py-2 text-sm bg-white border rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white hover:dark:bg-gray-700 ${
            !content ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Copy notes to clipboard"
        >
          <FaCopy /> Copy
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={!content || isDownloading}
          className={`flex items-center gap-2 px-4 py-2 text-sm bg-white border rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white hover:dark:bg-gray-700 ${
            !content || isDownloading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Download notes as PDF"
        >
          {isDownloading ? (
            <div className="loader"></div> // loader when downloading
          ) : (
            <FaDownload />
          )}
          {isDownloading ? "Downloading..." : "Download PDF"}
        </button>
      </div>

      {/* Render Markdown Content */}
      <div
        id="markdown-content"
        className="prose prose-sm sm:prose-base md:prose-lg max-w-none dark:prose-invert"
      >
        {content ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <p className="text-gray-500 italic text-center dark:text-gray-400">
            No notes to display.
          </p>
        )}
      </div>
    </div>
  );
}
