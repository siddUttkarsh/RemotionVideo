import React from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  return (
   
       <div className="flex justify-center sm:items-center h-screen ">
      <div className="relative w-full max-w-3xl">
        <video
          controls
          className="w-full rounded-lg shadow-lg"
        >
          <source src={"/out.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
   
  );
}

export default App;
