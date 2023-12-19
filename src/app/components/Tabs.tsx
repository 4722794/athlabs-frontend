"use client";
import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId: string) => {
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
              activeTab === tab.id ? "bg-[#2F3747]" : " bg-transparent "
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex h-[calc(100%-75px)] w-full flex-col py-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-content h-full ${
              activeTab === tab.id ? "block" : "hidden"
            }`}
          >
            <div className="flex h-full w-full flex-col justify-between">
              {tab.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
