"use client";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone, { IFileWithMeta, IUploadParams } from "react-dropzone-uploader";
import React, { ReactNode, useEffect, useState , } from "react";

interface InputFileUploadProps {
  //children: ReactNode;
  onDataFromChild: (data: any) => void;
}

const InputFileUpload: React.FC<InputFileUploadProps> = ({onDataFromChild }) => {
  const [childData, setChildData] = useState(null);
  const sendDataToParent = () => {
    // Call the callback function in the parent with the data
    onDataFromChild(childData);
  };

  useEffect(()=>{
    if(childData!=null){
      sendDataToParent();
    }
  },[childData])

  const getUploadParams = (file: IFileWithMeta): IUploadParams | Promise<IUploadParams> => {
    try {
      const formData = new FormData();
      const actualFile = file.file; // Access the actual file from fileWithMeta
  
      if (actualFile instanceof Blob) {
        formData.append("video", actualFile, actualFile.name);
       // formData.append("additionalField", "additionalValue");
       //const apiUrl = process.env.REACT_APP_URL || "http://localhost:3001"; //not working
       const apiUrl = "http://localhost:3000";
       const apiEndpoint = `${apiUrl}/video-upload`;
        return {
          url: apiEndpoint,
          method: "POST",
          body: formData,
        };
      } else {
        console.error('Invalid file:', actualFile);
        return Promise.reject(new Error('Invalid file type'));
      }
    } catch (error) {
      console.error('Error getting upload params:', error);
      return Promise.reject(error);
    }
  };

  const handleChangeStatus = ({ meta, file, xhr }: any, status: string) => {
    if (status === "done") {
      console.log(`${meta.name} uploaded!`);

      // Access the response from the server
      if (xhr && xhr.responseText) {
        const response = JSON.parse(xhr.responseText);
        console.log('Response from server:', response);

        // Handle the response as needed
        setChildData(response.feedback);
       
      }
    } else if (status === "error") {
      console.error(`${meta.name} failed to upload`);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-full border-2  border-dashed border-white/50 rounded-lg cursor-pointer bg-transparent hover:bg-[#171717] "
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            accept="video/*"
            maxFiles={1}
            styles={{
              dropzone: { minHeight: 200, maxHeight: 250 },
            }}
          />
         
          <svg
            className="w-20 h-20 mb-4  text-white/50 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm  text-white/50 ">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs  text-white/50 ">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  );
};

export default InputFileUpload;
