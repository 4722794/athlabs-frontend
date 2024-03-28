"use client";
import { Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

function ComonToast({ toastObj = {}, setToastObj, className }: any) {
  const [progress, setProgress] = useState(95);
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const total_time = 2750;
    if (toastObj.msg) {
      const timeout = setTimeout(() => {
        setToastObj({});
        clearInterval(timer);
        setShowToast(false);
      }, total_time);
      const timer = setInterval(() => {
        setProgress((prevProgress) => prevProgress - 1);
      }, total_time / 100);
      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [toastObj]);

  const handleToastToggle = () => {
    setShowProgressBar(false);
    setShowToast(false);
  };

  return (
    <div className="flex flex-col gap-0" style={{ position: "fixed", bottom: "1.9rem", right: "1.9rem", zIndex: 9999 }}>
      {showToast && (
        <Toast style={{padding:"0rem"}}>
          <div className="relative w-full">
            {showProgressBar && (
              <div
                className="absolute top-0 left-0 h-1.5 bg-green-400 rounded-tl-3xl rounded-r-lg"
                style={{ width: `${progress}%`, marginLeft: "0px"}}
              ></div>
            )}
            <div className="flex items-center justify-between w-full pt-1" style={{padding:"1rem"}}>
              <div className="flex items-center">
                <div
                  className={`inline-flex h-8 w-8 mb-0 pb-0 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200 ${className}`}
                >
                  {toastObj.type === "s" ? (
                    <HiCheck className="h-5 w-5" />
                  ) : toastObj.type === "e" ? (
                    <HiX className="h-5 w-5" />
                  ) : (
                    <HiExclamation className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-4 text-md font-normal">{toastObj.msg}</div>
              </div>
              <Toast.Toggle onDismiss={handleToastToggle} />
            </div>
          </div>
        </Toast>
      )}
    </div>
  );
}

export default ComonToast;