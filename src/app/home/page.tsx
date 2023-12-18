"use client";
import React, { ReactNode, useRef, useState } from "react";
// import "@/app/globals.css";
import Tabs from "@/app/components/Tabs";
import InputFileUpload from "../components/InputFileUpload";
import Chat from "../components/Chat";
import HomeLayout from "../layout/HomeLayout";
import CustomScroll from "react-custom-scroll";
interface Tab1ContentProps {
  compData: any;
}

const Tab1Content: React.FC<Tab1ContentProps> = ({ compData }) => (
  <div>
    {compData ? (
      <div className=" bg-[#171717] text-white p-4 rounded-xl  font-normal leading-7">
        <CustomScroll
          className="-mx-3"
          heightRelativeToParent="calc(100% - 20px)"
        >
          {compData}
        </CustomScroll>
      </div>
    ) : (
      ""
    )}
  </div>
);
const Tab2Content = () => (
  <div className=" flex h-full w-full">
    <div className=" flex flex-col w-full h-full justify-between">
      <div className=" h-full">
        <CustomScroll
          className="-mx-2"
          heightRelativeToParent="calc(100% - 20px)"
        >
          <Chat />
        </CustomScroll>
      </div>
      <div className=" ">
        <div className=" inline-flex  w-full">
          <form className=" relative w-full">
            <input
              type="text"
              className=" h-11  px-5 w-full pr-10 bg-[#2F3747]  border border-white/40  rounded-lg

                   ring-0 ring-inset ring-gray-300 text-white placeholder:text-gray-400 focus:ring-0 outline-none focus:ring-inset focus:ring-indigo-600
                  "
              placeholder="Type your message here..."
            />
            <a
              className=" absolute right-2.5 top-2.5 text-white hover:text-cyan-500"
              href="https://www.app.vitalx.in"
            >
              <svg
                width="31"
                height="28"
                viewBox="0 0 31 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.2928 26.8458C30.0078 27.1868 29.625 27.432 29.1961 27.5484C28.7673 27.6648 28.313 27.6467 27.8947 27.4965L16.9641 23.7559C16.8559 23.7191 16.762 23.6493 16.6956 23.5564C16.6291 23.4634 16.5934 23.352 16.5935 23.2378V13.4063C16.5939 13.2564 16.5634 13.108 16.5039 12.9703C16.4445 12.8327 16.3574 12.7087 16.248 12.6061C16.1387 12.5036 16.0094 12.4246 15.8682 12.3741C15.727 12.3236 15.577 12.3026 15.4273 12.3126C15.1461 12.3374 14.8846 12.4675 14.6952 12.6769C14.5058 12.8863 14.4025 13.1595 14.406 13.4419V23.2268C14.4063 23.3409 14.3708 23.4522 14.3046 23.5451C14.2384 23.638 14.1448 23.7079 14.0369 23.745L3.09941 27.4965C2.68014 27.6435 2.22607 27.6593 1.79762 27.5418C1.36916 27.4243 0.986623 27.1792 0.700898 26.839C0.415174 26.4988 0.239806 26.0797 0.198126 25.6374C0.156446 25.1951 0.25043 24.7505 0.467573 24.363L13.5857 1.39284C13.776 1.05455 14.0529 0.772991 14.388 0.577047C14.723 0.381103 15.1041 0.277832 15.4923 0.277832C15.8804 0.277832 16.2616 0.381103 16.5966 0.577047C16.9317 0.772991 17.2085 1.05455 17.3988 1.39284L30.5252 24.3561C30.7476 24.7445 30.8447 25.1921 30.8031 25.6377C30.7615 26.0834 30.5832 26.5053 30.2928 26.8458Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const AdminPage = () => {
  const [dataFromChild, setDataFromChild] = useState(null);
  const tabs = [
    {
      id: "tab1",
      label: "Feedback",
      content: <Tab1Content compData={dataFromChild} />,
    },
    { id: "tab2", label: "Chat", content: <Tab2Content /> },
  ];

  const handleChildData = (childData: any) => {
    // Do something with the data received from the child
    console.log("Data received from child:", childData);
    setDataFromChild(childData);
  };

  return (
    <HomeLayout>
      <div className="flex w-full  px-6 pt-5">
        <div className="flex w-full flex-col lg:flex-row  gap-x-2 gap-y-2">
          <div className="flex flex-col items-left relative w-full lg:w-8/12 rounded-2xl  ">
            <div className=" min-h-[462px] bg-[#1B212E]  rounded-2xl">
              <InputFileUpload onDataFromChild={handleChildData} />
            </div>
          </div>
          <div className="flex flex-col relative bg-[#1B212E]  w-full lg:w-4/12 rounded-2xl ">
            <div className=" min-h-[462px]  lg:h-[calc(100vh-100px)] bg-[#1B212E]  rounded-2xl">
              <Tabs tabs={tabs} />
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AdminPage;
