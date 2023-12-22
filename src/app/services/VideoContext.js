// VideoContext.js
import React, { createContext, useContext, useState } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [activeVideoDetail, setVideoDetail] = useState(null);
  const defaultValue = {fetchVideoHistroy:false,enableTypeWritter:false};
  const [otherData, setOtherData] = useState(defaultValue);
  const setActiveVideoData = (data) => {
    setVideoDetail(data);
  };

  const setDefaultData = () => {
    setOtherData(defaultValue);
    setVideoDetail(null);
  };

  return (
    <VideoContext.Provider value={{ activeVideoDetail, setActiveVideoData,setOtherData,otherData,setDefaultData }}>
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
