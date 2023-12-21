"use client";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone, {
  IFileWithMeta,
  IUploadParams,
} from "react-dropzone-uploader";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { checkLogin } from "../services/apiUtils";
import LoadingComp from "./LoadingComp";
import { useVideoContext } from "../services/VideoContext";
import { Spinner } from "flowbite-react";

interface InputFileUploadProps {
  //children: ReactNode;
  onDataFromChild: (data: any) => void;
}

const InputFileUpload: React.FC<InputFileUploadProps> = ({
  onDataFromChild,
}) => {
  const [childData, setChildData] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const [selectedFile, setSelectedFile] = useState(false); // New state for loading indicator
  const [formErrors, setFormErrors] = useState({ name: "", file: "" });
  const [name, setName] = useState(""); // New state for loading indicator

  // Reference to Dropzone instance
  const dropzoneRef = useRef<any>(null);
  const { setActiveVideoData, setOtherData, otherData } = useVideoContext();
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
      const xhrq = file.xhr;

      if (actualFile instanceof Blob) {
        formData.append("video", actualFile, actualFile.name);
        formData.append("name", name);
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
        setName("");
        //setChildData(response);
        setOtherData({
          ...otherData,
          fetchVideoHistroy: true,
          enableTypeWritter: true,
        });
        setActiveVideoData(response);
      }
    } else if (status === "error") {
      setLoading(false); // Set loading to false on error
      console.error(`${meta.name} failed to upload`);
    } else if (status === "ready") {
      setSelectedFile(true);
    }
  };
  const Preview = ({ meta }: any) => {
    const { name, percent, status } = meta;
    return (
      <div className="flex items-center justify-center w-full min-h-[200px] h-full bg-[#1B212E] rounded-md border-dash border-2 border-[#2F3747]  flex-col lg:flex-row py-5  lg:py-7 ">
        <div className=" relative">
          {loading && <Spinner aria-label="Default status example" size="xl" />}
        </div>
        <span
          className="self-center h-full flex items-center text-white text-2xl break-all"
          style={{ margin: "10px 3%", fontFamily: "Helvetica" }}
        >
          {name}
        </span>
      </div>
    );
  };

  const Layout = ({
    input,
    previews,
    submitButton,
    dropzoneProps,
    files,
    extra: { maxFiles },
  }: any) => {
    return (
      <>
        {previews}

        {files.length == 0 && (
          <div {...dropzoneProps}>{files.length < maxFiles && input}</div>
        )}

        {files.length > 0 && submitButton}
      </>
    );
  };
  const validateForm = () => {
    let valid = true;
    const errors = { name: "", file: "" };

    // Username validation
    /* if (name=='') {
      errors.name = "Title is required";
      valid = false;
    }
 */
    // Password validation
    if (!selectedFile) {
      errors.file = "video file is required";
      valid = false;
    }
    // Password validation
    /* else if (!password || !/(?=.*[A-Z])(?=.*[0-9]).{8,}/.test(password)) {
      errors.password =
        "Password must contain 1 uppercase letter, 1 number, and be at least 8 characters long";
      valid = false;
    } */

    setFormErrors(errors);
    return valid;
  };
  const handleSubmit = () => {
    // Manually trigger the upload
    if (validateForm()) {
      setSelectedFile(false);
      if (dropzoneRef.current) {
        dropzoneRef.current.handleRestart(dropzoneRef.current.files[0]);
      }
    }
  };

  return (
    <>
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
              LayoutComponent={Layout}
              ref={dropzoneRef}
              autoUpload={false}
              PreviewComponent={Preview}
              disabled={selectedFile}
              styles={{
                dropzone: {
                  minHeight: 200,
                  minWidth: "100%",

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
              addClassNames={{ dropzone: " changeColorLabel" }}
            />
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
          {/* {loading && <LoadingComp />} */}
        </label>
      </div>
      {formErrors.file && (
        <span>
          <p className="text-red-500 text-xs mt-1">{formErrors.file}</p>
        </span>
      )}

      <div className=" flex gap-x-5 items-end mt-5">
        <input
          type="text"
          placeholder="(optional) Enter exercise name"
          className="h-11  px-5 w-full pr-10 bg-[#2F3747]  border border-white/40  rounded-lg      ring-0 ring-inset ring-gray-300 text-white placeholder:text-gray-400 focus:ring-0 outline-none focus:ring-inset focus:ring-indigo-600 "
          value={name}
          maxLength={30}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {formErrors.name && (
          <span>
            <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
          </span>
        )}
        <button
          type="button"
          disabled={loading}
          className={`bg-white py-2 px-3  text-sm  font-semibold text-black inline-flex h-11 2xl:h-11 min-w-[110px] 2xl:min-w-[130px] justify-center items-center rounded-lg drop-shadow-md  shadow-white/40    ${
            loading
              ? " cursor-progress "
              : "hover:bg-gradient-to-r from-[#101828] to-[#44366a] hover:text-white cursor-pointer"
          }`}
          value={"Submit"}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default InputFileUpload;
