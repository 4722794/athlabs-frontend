// VideoContext.js
import React, { createContext, useContext, useState } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videoDetail, setVideoDetail] = useState(null);

  const setVideoDetailData = (data) => {
    setVideoDetail(data);
  };

  return (
    <VideoContext.Provider value={{ videoDetail, setVideoDetailData }}>
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
