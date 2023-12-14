"use client";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone, {
  IFileWithMeta,
  IUploadParams,
  PreviewProps,
} from "react-dropzone-uploader";
import React, { useEffect, useState, useRef } from "react";

interface InputFileUploadProps {
  children: ReactNode;
}

interface CustomPreviewProps {
  meta: {
    name: string;
    // Add other meta properties as needed
  };
  fileWithMeta: {
    remove: () => void;
    restart: () => void;
    xhr: XMLHttpRequest | null;
    // Add other fileWithMeta properties as needed
  };
  status: string;
}

const CustomPreview: React.FC<CustomPreviewProps> = ({
  meta,
  fileWithMeta,
  status,
}) => {
  const { remove, restart, xhr } = fileWithMeta;
  const isUploaded = status === "done";

  return (
    <div className="custom-preview">
      {/* Your custom preview UI */}
      <div>
        <strong>{meta.name}</strong>
        {isUploaded && <span> - Uploaded!</span>}
        {!isUploaded && xhr && xhr.statusText && (
          <span> - Error: {xhr.statusText}</span>
        )}
      </div>
      <div>
        <button onClick={remove}>Remove</button>
        {!isUploaded && <button onClick={restart}>Restart</button>}
      </div>
    </div>
  );
};

const InputFileUpload: React.FC<InputFileUploadProps> = ({
  onDataFromChild,
}) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [childData, setChildData] = useState(null);
  const sendDataToParent = () => {
    // Call the callback function in the parent with the data
    onDataFromChild(childData);
  };

  useEffect(() => {
    if (childData != null) {
      sendDataToParent();
    }
  }, [childData]);

  const getUploadParams = ({
    file,
  }: {
    file: IFileWithMeta;
  }): IUploadParams | Promise<IUploadParams> => {
    // You can customize the upload URL and other parameters here
    console.log(file);
    const formData = new FormData();
    formData.append("video", file);

    return {
      url: "http://localhost:3000/video-upload", // Replace with your actual API endpoint
      method: "POST",
      body: formData,
    };
  };

  const handleChangeStatus = ({ meta, file, xhr }: any, status: string) => {
    if (status === "done") {
      console.log(`${meta.name} uploaded!`);

      // Access the response from the server
      if (xhr && xhr.responseText) {
        const response = JSON.parse(xhr.responseText);
        console.log("Response from server:", response);

        // Handle the response as needed
        setChildData(response.feedback);
      }
    } else if (status === "error") {
      console.error(`${meta.name} failed to upload`);
    }
  };

  interface CustomDropzoneStyles extends IStyleCustomization<CSSProperties> {
    inputContent: CSSProperties & {
      iconImage?: CSSProperties; // Your custom styles for the SVG icon container
    };
    previewImage: CSSProperties; // Your custom styles for the preview image (if needed)
    dropzone: CSSProperties; // Your custom styles for the entire Dropzone container
    inputLabel: CSSProperties; // Your custom styles for the input label
    input: CSSProperties; // Your custom styles for the input element
    fileInput: CSSProperties; // Your custom styles for the file input container
    submitButtonContainer: CSSProperties; // Your custom styles for the submit button container (if needed)
    submitButton: CSSProperties; // Your custom styles for the submit button (if needed)
  }

  const customStyles: CustomDropzoneStyles = {
    inputContent: {
      // Your custom styles for the SVG icon container
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    previewImage: {
      // Your custom styles for the preview image (if needed)
      maxWidth: "100%", // Set the maximum width as needed
      maxHeight: "100%", // Set the maximum height as needed
      borderRadius: "8px", // Add border-radius or other styles
    },
    dropzone: {
      // Your custom styles for the entire Dropzone container
      minHeight: 200,
      maxHeight: 250,
    },
    inputLabel: {
      // Your custom styles for the input label
      // This is where the icon image is placed
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      // Add any additional styles you need
    },
    input: {
      // Your custom styles for the input element
      display: "none", // Hide the default file input
    },
    fileInput: {
      // Your custom styles for the file input container
    },
    submitButtonContainer: {
      // Your custom styles for the submit button container (if needed)
    },
    submitButton: {
      // Your custom styles for the submit button (if needed)
    },
  };

  const dropzoneRef = useRef(null);
  useEffect(() => {
    // Set the id attribute for the input field
    const dropzoneInput = document.querySelector(".dzu-input");
    if (dropzoneInput) {
      dropzoneInput.id = "dropzone-file";
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-full border-2  border-dashed border-white/50 rounded-lg cursor-pointer bg-transparent hover:bg-[#171717] "
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Dropzone
            ref={dropzoneRef}
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            accept="video/*"
            maxFiles={1}
            styles={customStyles}
            inputProps={{ id: "dropzone-file" }} // Add the id to the input
            PreviewComponent={CustomPreview}
          />

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <div style={customStyles.inputContent}>
            <img src="/path/to/upload-icon.png" alt="Upload Icon" />
          </div>

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
        {/* <input id="dropzone-file" type="file" className="hidden" /> */}
      </label>
    </div>
  );
};

export default InputFileUpload;
