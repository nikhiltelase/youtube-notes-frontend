import React, { useState } from "react";
import UrlInput from "../components/UrlInput";
import Notes from "../components/Notes";
import { getTranscript } from "../services/youtubeService";
import { generateNotes } from "../services/geminiService";
import { extractVideoId } from "../utils/videoUtils";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [isNotesGenerated, setIsNotesGenerated] = useState(false);
  const [embedVideoUrl, setEmbedVideoUrl] = useState("");

  const handleSubmit = async (url) => {
    try {
      setIsLoading(true);
      setError("");
      setIsNotesGenerated(false);
      setEmbedVideoUrl(extractVideoId(url));

      const transcript = await getTranscript(url);
      const generatedNotes = await generateNotes(transcript);
      setNotes(generatedNotes);
      setIsNotesGenerated(true);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <div className="flex flex-col lg:flex-row w-full h-full">
        {/* Left Panel: Video */}
        <div className="lg:w-3/5 bg-white dark:bg-gray-800 shadow-md rounded-lg mt-4 m-2 lg:sticky top-4 self-start">
          <div className="p-2">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">Video Player</h2>
            <div className="rounded-lg overflow-hidden aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${embedVideoUrl || "lKjneOaxumc"}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right Panel: Input, Button, and Notes */}
        <div className="lg:w-2/4 shadow-md rounded-lg mt-4 m-2 flex flex-col bg-white dark:bg-gray-800">
          {/* Input Section */}
          <div className="p-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
              Generate AI Notes
            </h2>
            <UrlInput onSubmit={handleSubmit} isLoading={isLoading} />
            {error && (
              <div className="mt-2 bg-red-50 dark:bg-red-800 text-red-600 dark:text-red-400 p-2 rounded-md">
                {error}
              </div>
            )}
            {isLoading && (
              <div className="text-center mt-4">
                <div className="animate-spin h-8 w-8 border-t-4 border-indigo-600 dark:border-indigo-300 rounded-full mx-auto"></div>
                <p className="text-indigo-600 dark:text-indigo-300 mt-2">Generating notes...</p>
              </div>
            )}
          </div>

          {/* Notes Section */}
          <div className="p-4 flex-grow overflow-y-auto">
            {notes ? (
              <Notes content={notes} />
            ) : (
              <p className="text-gray-500 dark:text-gray-300 italic text-center">
                Enter a YouTube video URL to generate notes.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
