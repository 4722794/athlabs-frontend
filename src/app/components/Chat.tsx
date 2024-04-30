"use client";
import React, { useRef, useEffect } from "react";
import CustomScroll from "react-custom-scroll";
import "react-custom-scroll/dist/customScroll.css";
import { useVideoContext } from "../services/VideoContext";

interface Message {
  id: number;
  text: string;
  sender: string;
}

const Chat: React.FC = () => {
  const { activeVideoDetail } = useVideoContext();
  const customScrollRef = useRef<any>(null);

  const scrollToBottom = () => {
    if (customScrollRef.current) {
      customScrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [activeVideoDetail]);

  return (
    <div className="flex flex-col h-full">
      <CustomScroll className="" heightRelativeToParent="calc(100% - 20px)">
        <div className="p-3 flex flex-col gap-y-3">
          {/* Check if activeVideoDetail and chat exist */}
          {activeVideoDetail &&
            activeVideoDetail.messages &&
            activeVideoDetail.messages.map((message: Message, index: any) => (
              <div
                key={index}
                className={`flex items-center ${
                  message.sender === "user" ? " justify-end" : ""
                }`}
              >
                <div style={{whiteSpace: 'pre-line'}}
                  className={`max-w-[90%] ${
                    message.sender === "user"
                      ? "bg-[#171717] text-white rounded-br-none"
                      : "bg-blue-500 text-white rounded-bl-none"
                  } text-sm py-3 px-4 rounded-lg rounded-${
                    message.sender === "user" ? "tl" : "tr"
                  }-none`}
                >
                  {message.text}
                </div>
              </div>
            ))}
        </div>
        <span ref={customScrollRef}></span>
      </CustomScroll>
    </div>
  );
};

export default Chat;
