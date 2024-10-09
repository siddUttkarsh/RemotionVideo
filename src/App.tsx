import React from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  return (
   
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 md:px-0">
    <h1 className="text-3xl mb-12">Video player with React and Remotion</h1>
    <div className="relative w-full max-w-3xl ">
      <div className="border-2 border-gray-700 rounded-lg shadow-lg overflow-hidden">
        <video
          controls
          className="w-full h-72"
        >
          <source src="/out.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <div className="mt-4 w-full max-w-3xl px-4">
      <p className="text-gray-400 text-sm">
        This videos was created with remotion to add animated captions.
      </p>
    </div>
  </div>
   
  );
}

export default App;
