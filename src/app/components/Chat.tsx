"use client";
import React, { useState } from "react";
import CustomScroll from "react-custom-scroll";
import "react-custom-scroll/dist/customScroll.css"; // Import the styles
import { useVideoContext } from "../services/VideoContext";

const Chat = () => {
  const { videoDetail } = useVideoContext();

  console.log("Video Detail:", videoDetail);

  return (
    <div className="flex flex-col h-full">
      <CustomScroll className="" heightRelativeToParent="calc(100% - 20px)">
        <div className="p-3 flex flex-col gap-y-3">
          <div className="flex items-center ">
            <div className="max-w-[90%] bg-[#171717] text-white text-sm py-3 px-4 rounded-lg">
              Hello! How can I help you today?
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="max-w-[90%] bg-blue-500 text-white text-sm py-3 px-4 rounded-lg">
              Hi there! I have a question about your products.
            </div>
          </div>
        </div>
      </CustomScroll>
    </div>
  );
};

export default Chat;
