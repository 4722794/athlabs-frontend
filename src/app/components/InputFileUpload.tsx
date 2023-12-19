"use client";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone, {
  IFileWithMeta,
  IUploadParams,
} from "react-dropzone-uploader";
import React, { ReactNode, useEffect, useState } from "react";
import { checkLogin } from "../services/apiUtils";
import LoadingComp from "./LoadingComp";
import { useVideoContext } from "../services/VideoContext";

interface InputFileUploadProps {
  //children: ReactNode;
  onDataFromChild: (data: any) => void;
}

const InputFileUpload: React.FC<InputFileUploadProps> = ({
  onDataFromChild,
}) => {
  const [childData, setChildData] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const { setActiveVideoData } = useVideoContext();
  const sendDataToParent = () => {
    // Call the callback function in the parent with the data
    onDataFromChild(childData);
  };

  useEffect(() => {
    if (childData != null) {
      sendDataToParent();
    }
  }, [childData]);

  const getUploadParams = (
    file: IFileWithMeta
  ): IUploadParams | Promise<IUploadParams> => {
    try {
      const formData = new FormData();
      const actualFile = file.file;

      if (actualFile instanceof Blob) {
        formData.append("video", actualFile, actualFile.name);
        const apiUrl = process.env.NEXT_PUBLIC_API_HOST;
        const apiEndpoint = `${apiUrl}`;

        // Include authentication headers
        const headers = {
          Authorization: `Bearer ${checkLogin()}`, // Replace with your actual token
        };

        return {
          url: apiEndpoint,
          method: "POST",
          body: formData,
          headers,
        };
      } else {
        console.error("Invalid file:", actualFile);
        return Promise.reject(new Error("Invalid file type"));
      }
    } catch (error) {
      console.error("Error getting upload params:", error);
      return Promise.reject(error);
    }
  };

  const handleChangeStatus = ({ meta, file, xhr }: any, status: string) => {
    if (status === "uploading") {
      setLoading(true); // Set loading to true when uploading
    } else if (status === "done") {
      setLoading(false); // Set loading to false when upload is complete

      if (xhr && xhr.responseText) {
        const response = JSON.parse(xhr.responseText);
        //setChildData(response);
        setActiveVideoData(response);
      }
    } else if (status === "error") {
      setLoading(false); // Set loading to false on error
      console.error(`${meta.name} failed to upload`);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-transparent"
      >
        <div className="flex items-center justify-center w-full h-full">
          <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            accept="video/*"
            maxFiles={1}
            styles={{
              dropzone: {
                minHeight: 200,

                border: "2px dashed #2F3747",
                borderRadius: "8px",
                backgroundColor: "#1B212E",
                padding: "20px",
                textAlign: "center",
                overflow: "hidden",
                width: "100%",
                height: "100%",
              },
              input: {
                display: "none",
              },
              dropzoneActive: {
                borderColor: "#2ecc71",
              },
            }}
          />
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
        {loading && <LoadingComp />}
      </label>
    </div>
  );
};

export default InputFileUpload;
