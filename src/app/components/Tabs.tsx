"use client";
import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className=" flex h-full w-full  mx-auto  p-5 flex-col">
      <div className="flex space-x-4 border border-white rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`grow py-2 px-4 text-white rounded-xl text-sm ${
              activeTab === tab.id ? "bg-[#171717]" : " bg-transparent "
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex h-full w-full flex-col py-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-content h-full ${
              activeTab === tab.id ? "block" : "hidden"
            }`}
          >
            <div className="flex h-full w-full flex-col">{tab.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
