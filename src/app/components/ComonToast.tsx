"use client";
import { Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

function ComonToast({ toastObj = {}, setToastObj, className }: any) {
  const [progress, setProgress] = useState(90);
  const [showProgressBar, setShowProgressBar] = useState(true); // Add state variable for progress bar visibility
  const [showToast, setShowToast] = useState(true); // Add state variable for toast visibility

  useEffect(() => {
    const total_time = 2500;
    if (toastObj.msg) {
      const timeout = setTimeout(() => {
        setToastObj({});
        clearInterval(timer);
        setShowToast(false); // Hide the toast when timeout occurs
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
    setShowProgressBar(false); // Hide the progress bar when toast toggle is pressed
    setShowToast(false); // Hide the toast when toast toggle is pressed
  };

  return (
    <div className="flex flex-col gap-0" style={{ position: 'fixed', bottom: '1.9rem', right: '1.9rem', zIndex: 9999 }}>
      {showProgressBar && ( // Render the progress bar only if showProgressBar is true
        <div
          className="h-1 bg-green-400 rounded-lg"
          style={{ width: `${progress}%`}}
        ></div>
      )}
      {showToast && ( // Render the toast only if showToast is true
        <Toast>
          <div
            className={`inline-flex h-8 w-8 mb-0 pb-0 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200 ${className}`}
          >
            {toastObj.type === "s" ? (
              <HiCheck className="h-5 w-5" /> // If toastObj.type is 's'
            ) : toastObj.type === "e" ? (
              <HiX className="h-5 w-5" />
            ) : (
              <HiExclamation className="h-5 w-5" />
            )}
          </div>
          <div className="ml-3 text-lg font-normal">{toastObj.msg}</div>
          <Toast.Toggle onDismiss={handleToastToggle}/>
        </Toast>
      )}
    </div>
  );
}

export default ComonToast;
