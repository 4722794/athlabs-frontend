"use client";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone, {
  IFileWithMeta,
  IUploadParams,
} from "react-dropzone-uploader";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { checkLogin } from "../services/apiUtils";
import LoadingComp from "./LoadingComp";
import { useVideoContext } from "../services/VideoContext";
import { Spinner } from "flowbite-react";
import ComonToast from "./ComonToast";
import VideoTrimmer, { formatTime } from "./VideoTrimmer";

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
  const [toastObj, setToastObj] = useState({ type: "", msg: "" });
  const [name, setName] = useState(""); // New state for loading indicator
  const nameRef = useRef(""); // Assuming the initial name is an empty string
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadedVideo, setUploadedVideo] = useState<any>(null);
  // const [trimmedVideoFile, setTrimmedVideoFile] = useState<any>(null);
  const [videoMeta, setVideoMeta] = useState<any>(null);
  const [rStart, setRstart] = useState(0);
  const [rEnd, setRend] = useState(0);

  // const [handleTrim, setHandleTrim] = useState<(() => void) | null>(null);

  // const handleTrimRef = useRef<(() => void) | null>(null);

  // const handleTrimChange = (newTrim: any) => {
  //   handleTrimRef.current = newTrim;
  // };

  // useEffect(() => {
  //   if (handleTrimRef.current !== null) {
  //     setHandleTrim(() => handleTrimRef.current);
  //   }
  // }, [handleTrimRef.current]);

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
        formData.append("name", nameRef.current);
        // append the start and end time to the form data
        formData.append("start_time", formatTime(rStart));
        formData.append("end_time", formatTime(rEnd));
        const apiUrl = process.env.NEXT_PUBLIC_API_HOST;
        const apiEndpoint = `/processVideo`;

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
        nameRef.current = "";
        //setChildData(response);
        setOtherData({
          ...otherData,
          fetchVideoHistroy: false,
          enableTypeWritter: true,
        });
        setActiveVideoData(response);
        // const trimmedVideoUrl = URL.createObjectURL(trimmedVideoFile);
        // setActiveVideoData({ ...response, video_url: trimmedVideoUrl });
      }
    } else if (status === "error_upload") {
      setLoading(false); // Set loading to false on error
      console.log(xhr);
      // Have a toast object to display error message
      toastObj.type = "error";
      toastObj.msg = "Could not process the video. Try again later";
      setToastObj(toastObj);
      console.error(`${meta.name} failed to upload`);
      setSelectedFile(true);
    } else if (status === "error") {
      setLoading(false); // Set loading to false on error
      console.error(`${meta.name} failed to upload`);
    } else if (status === "ready") {
      setVideoMeta(meta);
      setSelectedFile(true);
      setUploadedVideo(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const Preview = ({ meta, name }: any) => {
    const { percent, status, duration } = meta;
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const rStartRef = useRef(rStart);
    const rEndRef = useRef(rEnd);

    useEffect(() => {
      rStartRef.current = rStart;
      rEndRef.current = rEnd;
    }, [rStart, rEnd]);

    const handleTimeUpdate = useCallback(() => {
      if (videoRef.current && videoRef.current.currentTime >= rEndRef.current) {
        videoRef.current.pause();
      }
    }, [videoRef.current, rEndRef.current]);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = rStartRef.current;
        videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
      }

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        }
      };
    }, [handleTimeUpdate]);

    return (
      <div className="flex justify-center w-full min-h-[650px] h-full bg-[#1B212E] rounded-md border-dash border-2 border-[#2F3747]  flex-col">
        <div className="flex justify-center relative">
          {loading && <Spinner aria-label="Default status example" size="xl" />}
        </div>
        {!loading && (
          <div className=" landscape:min-h-screen landscape:lg:min-h-[calc(100vh-100px)] landscape:lg:h-[calc(100vh-100px)]  min-h-[300px] lg:min-h-[462px]  lg:h-[calc(100vh-100px)] bg-[#1B212E]  rounded-xl flex justify-between flex-col ">
            <video
              ref={videoRef}
              playsInline
              controls
              className=" landscape:h-[calc(100vh-45px)] landscape:w-auto landscape:lg:h-[calc(100%-66px)] lg:h-[calc(100%-66px)] my-auto mx-auto"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* <div
              className=" text-lg px-5 flex items-center min-h-[66px] drop-shadow-xl  border-t border-gray-900  bg-[#26313F]"
              style={{ color: "#fff" }}
            >
              {name}
            </div> */}
          </div>
        )}
        {/* <span
          className="self-center h-full flex items-center text-white text-2xl break-all"
          style={{ margin: "10px 3%", fontFamily: "Helvetica" }}
        >
          {name}
        </span> */}
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
    const meta = files[0]?.meta;

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

  // useEffect(() => {
  //   if (trimmedVideoFile) {
  //     handleSubmitFinally();
  //   }
  // }, [trimmedVideoFile]);

  // const handleSubmit = async () => {
  //   if (validateForm()) {
  //     if (handleTrimRef.current !== null) {
  //       const trimmedVideo = await handleTrimRef.current();
  //       setTrimmedVideoFile(trimmedVideo);
  //     }
  //   }
  // };

  const handleSubmit = () => {
    // Manually trigger the upload
    if (validateForm()) {
      setSelectedFile(false);
      if (dropzoneRef.current) {
        dropzoneRef.current.handleRestart(dropzoneRef.current.files[0]);
      }
    }
  };

  // const handleSubmitFinally = async () => {
  //   setSelectedFile(false);
  //     if (dropzoneRef.current) {
  //       dropzoneRef.current.handleRestart(dropzoneRef.current.files[0]);
  //     }
  // };

  const inputContent = (files: any, extra: any): any => {
    if (extra.reject) {
      return (
        <div className=" gap-y-4 flex flex-col px-4" key={Math.random()}>
          <p className=" text-xl font-semibold">
            Drag Files or Click to Browse
          </p>
          <p className=" text-[15px]  font-normal">
            Please upload an exercise video, optionally the exercise name and
            click <strong>“submit”</strong> to perform an analysis.
          </p>
          <p className=" text-[12px] font-light">
            Note: .mov, .mp4 video formats currently supported. Upload videos
            less than 20 seconds for best results
          </p>
        </div>
      );
    } else {
      return (
        <div className=" gap-y-4 flex flex-col px-4" key={Math.random()}>
          <p className=" text-xl font-semibold">
            Drag Files or Click to Browse
          </p>
          <p className=" text-[15px]  font-normal">
            Please upload an exercise video, optionally the exercise name and
            click <strong>“submit”</strong> to perform an analysis.
          </p>
          <p className=" text-[12px] font-light">
            Note: .mov, .mp4 video formats currently supported. Upload videos
            less than 20 seconds for best results
          </p>
        </div>
      );
    }
  };

  const InputComponent = ({ textname, formErrors, onNameChange }: any) => {
    const [localName, setLocalName] = useState(textname);

    const handleNameChange = (e: any) => {
      setLocalName(e.target.value);
      onNameChange(e.target.value);
    };
    return (
      <>
        <input
          type="text"
          placeholder="(optional) Enter exercise name"
          className="h-11 text-sm md:text-md pl-4 px-2.5  md:px-5 md:pl-5 w-full bg-[#2F3747]  border border-white/40  rounded-lg      ring-0 ring-inset ring-gray-300 text-white placeholder:text-gray-400 focus:ring-0 outline-none focus:ring-inset focus:ring-indigo-600 "
          value={localName}
          maxLength={30}
          onChange={handleNameChange}
        />
        {formErrors.name && (
          <span>
            <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
          </span>
        )}
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
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
              inputContent={inputContent}
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
        {selectedFile && (
          <div
            className=" text-lg px-5 flex items-center min-h-[66px] drop-shadow-xl  border-t border-gray-900  bg-[#26313F] w-full -mt-1 trimClass"
            style={{ color: "#fff" }}
          >
            <VideoTrimmer
              rStart={rStart}
              rEnd={rEnd}
              setRstart={setRstart}
              setRend={setRend}
              videoMeta={videoMeta}
            />
          </div>
        )}
      </div>
      {formErrors.file && (
        <span>
          <p className="text-red-500 text-xs mt-1">{formErrors.file}</p>
        </span>
      )}

      <div className=" flex gap-x-2 lg:gap-x-5 items-end mt-2 lg:mt-5">
        <InputComponent
          textname={nameRef.current}
          formErrors={formErrors}
          onNameChange={(value: any) => {
            nameRef.current = value;
          }}
        />
        <button
          type="button"
          disabled={loading}
          className={`bg-white py-2 px-3  text-sm  font-semibold text-black inline-flex h-11 2xl:h-11 min-w-[90px] md:min-w-[110px] 2xl:min-w-[130px] justify-center items-center rounded-lg drop-shadow-md  shadow-white/40    ${
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
      <div className="flex items-center justify-center w-full h-full mt-2 lg:mt-5">
        {toastObj.type && (
          <ComonToast toastObj={toastObj} setToastObj={setToastObj} />
        )}
      </div>
    </>
  );
};

export default InputFileUpload;
