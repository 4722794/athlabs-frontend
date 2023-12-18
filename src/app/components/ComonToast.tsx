"use client";
import { Toast } from "flowbite-react";
import { useEffect } from "react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

function ComonToast({ toastObj={},setToastObj }:any) {
    useEffect(() => {
        if (toastObj.msg) {
          const timer = setTimeout(() => {
            setToastObj({});
          }, 2000);     
          return () => clearTimeout(timer); 
        }
      }, [toastObj]);
  return (
    <div className="flex flex-col gap-4">
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          {toastObj.type === "s" ? (
            <HiCheck className="h-5 w-5" /> // If toastObj.type is 's'
          ) : toastObj.type === "e" ? (
            <HiX className="h-5 w-5" />
          ) : (
            <HiExclamation className="h-5 w-5" />
          )}
        </div>
        <div className="ml-3 text-sm font-normal">{toastObj.msg}</div>
        <Toast.Toggle />
      </Toast>
    </div>
  );
}

export default ComonToast;
