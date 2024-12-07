import axios from 'axios';
import { validateYouTubeUrl, extractVideoId } from '../utils/videoUtils';

const backend_url = import.meta.env.VITE_BACKEND_URL
const API_BASE_URL = `${backend_url}/api/transcript`;
console.log(API_BASE_URL)

export const getTranscript = async (videoUrl) => {
  try {
    // Validate the YouTube URL
    if (!validateYouTubeUrl(videoUrl)) {
      throw new Error('Invalid YouTube URL');
    }

    const videoId = extractVideoId(videoUrl);
    
    // Send the request to the backend to fetch the transcript
    const response = await axios.get(`${API_BASE_URL}/${videoId}`);
    console.log(response);  // Debugging log

    // Check if the response contains data
    if (!response.data) {
      throw new Error('No transcript available for this video');
    }
    
    console.log(response.data.transcript)
    return response.data.transcript;

  } catch (error) {
    console.error(error); // Improved logging for debugging

    // Handle specific error responses based on the server's status code
    if (error.response) {
      if (error.response.status === 404) {
        // No transcript found
        throw new Error('No transcript available for this video');
      } else if (error.response.status === 403) {
        // Transcript disabled for the video
        throw new Error('Transcript is disabled for this video');
      }
    }

    // Handle network or server errors
    if (error.message === 'Invalid YouTube URL') {
      throw new Error('Please provide a valid YouTube URL');
    }

    // Catch any other error
    throw new Error(error.message || 'Failed to fetch transcript');
  }
};
