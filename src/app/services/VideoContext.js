// VideoContext.js
import React, { createContext, useContext, useState } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [activeVideoDetail, setVideoDetail] = useState(null);

  const setActiveVideoData = (data) => {
    setVideoDetail(data);
  };

  return (
    <VideoContext.Provider value={{ activeVideoDetail, setActiveVideoData }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
