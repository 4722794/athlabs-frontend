"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import CustomScroll from "react-custom-scroll";
import "react-custom-scroll/dist/customScroll.css";
import { callApi } from "../services/apiUtils";
import { useVideoContext } from "../services/VideoContext";
import { Spinner, Dropdown, Avatar, Tooltip } from "flowbite-react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Typewriter from "typewriter-effect";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

interface SidebarProps {
  modalOpen: boolean;
  toggleSidebar: () => void;
}

interface GroupedVideos {
  [key: string]: any[] | undefined;
}

interface VideoLoading {
  [videoId: string]: boolean;
}

interface VideoEdit {
  [videoId: string]: boolean;
}

interface Video {
  video_id: string;
  // Other properties of the Video object
}

const Sidebar: React.FC<SidebarProps> = ({ modalOpen, toggleSidebar }) => {
  const [videoData, setVideoData] = useState([]);
  const [activeVideo, setactiveVideo] = useState(false);
  const { setActiveVideoData, setOtherData, otherData } = useVideoContext();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [videoLoading, setVideoLoading] = useState<VideoLoading>({});
  const [videoEdit, setVideoEdit] = useState<VideoEdit>({});
  const [editTitle, setEditTitle] = useState("");
  const componentRef = useRef(null);
  const { activeVideoDetail, setDefaultData } = useVideoContext();

  const setLoadingForVideo = (videoId: any, isLoading: any) => {
    setVideoLoading((prevLoading) => ({
      ...prevLoading,
      [videoId]: isLoading,
    }));
  };

  const setEditForVideo = (videoId: any, isEdit: any) => {
    setVideoEdit((prevLoading) => ({
      ...prevLoading,
      [videoId]: isEdit,
    }));
  };

  useEffect(() => {
    getVideoHistory();
  }, []);
  useEffect(() => {
    if (otherData.fetchVideoHistroy) {
      getVideoHistory();
      setOtherData({ ...otherData, fetchVideoHistroy: false });
    }

    const userFromLocalStorage = localStorage.getItem("athlabsLoggedInUser");
    if (userFromLocalStorage) {
      setLoggedInUser(userFromLocalStorage);
    }
  }, [otherData.fetchVideoHistroy]);

  const getVideoHistory = async () => {
    const uriString = ``;
    const method = "GET";
    const contentType = "application/json";
    const responseData = await callApi(method, contentType, null, uriString);
    if (responseData.status) {
      setVideoData(responseData.data.videos);
      let TLoggedInUser = localStorage.getItem("athlabsLoggedInUser");
      if (responseData?.data?.email && TLoggedInUser === null) {
        localStorage.setItem("athlabsLoggedInUser", responseData.data.email);
        setLoggedInUser(responseData.data.email);
      }
    }
  };

  const groupVideosByDate = (videos: any[]): GroupedVideos => {
    if (!videos || videos.length === 0) {
      return {};
    }

    const groupedVideos: GroupedVideos = {};

    // Function to get date label based on video timestamp
    const getDateLabel = (videoDate: number): string => {
      const today = new Date().setHours(0, 0, 0, 0);
      const yesterday = new Date(today - 86400000).setHours(0, 0, 0, 0); // Subtract 1 day in milliseconds

      if (videoDate === today) {
        return "Today";
      } else if (videoDate === yesterday) {
        return "Yesterday";
      } else {
        const diffTime = Math.abs(today - videoDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 7) {
          return "Previous 7 days";
        } else if (diffDays <= 30) {
          return "Previous 30 days";
        } else {
          return "Older";
        }
      }
    };

    videos.length > 0 &&
      videos.forEach((video) => {
        const videoDate = new Date(video.timestamp).setHours(0, 0, 0, 0);
        const label = getDateLabel(videoDate);

        if (!groupedVideos[label]) {
          groupedVideos[label] = [];
        }
        groupedVideos[label]?.push(video);
      });

    // Sort the groupedVideos by date labels in descending order
    const order: Record<string, number> = {
      Today: 1,
      Yesterday: 2,
      "Previous 7 days": 3,
      "Previous 30 days": 4,
      Older: 5,
    };

    const sortedLabels = Object.keys(groupedVideos).sort((a, b) => {
      return order[a] - order[b];
    });

    // Create a new object with sorted groups
    const sortedGroupedVideos: Record<string, any[]> = {};
    sortedLabels.forEach((label) => {
      sortedGroupedVideos[label] = groupedVideos[label] || []; // Ensure the property exists
    });
    return sortedGroupedVideos;
  };

  const groupedVideos = groupVideosByDate(videoData);

  const getVideoDetail = async (videoId: any) => {
    clearEditScreen();
    setLoadingForVideo(videoId, true);
    const uriString = `/h/${videoId}`;
    const method = "GET";
    const contentType = "application/json";
    try {
      const responseData = await callApi(method, contentType, null, uriString);

      if (responseData.status) {
        setactiveVideo(videoId);
        setActiveVideoData(responseData.data);
        responseData.data.videos.forEach((video: Video) => {
          videoLoading[video.video_id] = false; // Set default loading status to false
          videoEdit[video.video_id] = false; // Set default Edit to false
        });
      }
    } catch (error) {
      // Handle error if needed
    } finally {
      setLoadingForVideo(videoId, false); // Set loading to false after fetching details
    }
  };

  const clearPage = () => {
    setactiveVideo(false);
    setActiveVideoData(null);
    clearEditScreen();
  };

  const removeVideoHistory = async (videoId: any) => {
    setLoadingForVideo(videoId, true);
    const uriString = `/h/${videoId}`;
    const method = "DELETE";
    const contentType = "application/json";
    try {
      const responseData = await callApi(method, contentType, null, uriString);
      if (responseData.status) {
        getVideoHistory();
      }
    } catch (error) {
      // Handle error if needed
    } finally {
      setLoadingForVideo(videoId, false); // Set loading to false after fetching details
    }
    clearPage();
  };

  const updateVideoTitle = async (e: any) => {
    if (e.key === "Enter") {
      // alert("enter");
      let videoId = activeVideo;
      let videoTitle = editTitle;
      setLoadingForVideo(videoId, true);
      const videoName = encodeURIComponent(videoTitle);
      const uriString = `/h/${videoId}?name=${videoName}`;
      const method = "PATCH";
      const contentType = "application/json";

      try {
        const responseData = await callApi(
          method,
          contentType,
          null,
          uriString
        );
        if (responseData.status) {
          getVideoHistory();
          setActiveVideoData(responseData.data);
          activeVideoDetail.name = videoTitle;
        }
      } catch (error) {
        // Handle error if needed
      } finally {
        setLoadingForVideo(videoId, false); // Set loading to false after fetching details
        setEditForVideo(videoId, false); // Set edit to false after fetching details
      }
    }
  };

  const openEditBox = (videoId: any, titleNeedToEdit: any) => {
    setEditForVideo(videoId, true);
    setEditTitle(titleNeedToEdit);
  };

  const router = useRouter();
  const logOut = () => {
    localStorage.removeItem("athlabsAuthToken");
    localStorage.removeItem("athlabsLoggedInUser");
    const tokenAfterRemoval = localStorage.getItem("athlabsAuthToken");
    if (tokenAfterRemoval === null) {
      setDefaultData();
      router.push("/login");
    }
  };

  const clearEditScreen = () => {
    let oldRecord = videoEdit;
    oldRecord[activeVideo.toString()] = false;
    setVideoEdit(oldRecord);
    setEditTitle("");
  };

  return (
    <div
      className={`dark flex-shrink-0  bg-[#1B212E] absolute h-full z-40 lg:relative  ${
        modalOpen ? " w-[260px] visible" : " w-0 invisible"
      }`}
      ref={componentRef}
    >
      <div className="h-full w-[260px]">
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex h-full min-h-0 flex-col transition-opacity opacity-100">
            <div className="sticky left-0 right-0 top-0 z-20 bg-[#1B212E] py-2.5 min-h-[56px]">
              <div className=" flex justify-between px-3 gap-x-3">
                <button
                  className=" grow  text-white border border-[#484A4E] px-3 py-2.5 rounded-md hover:bg-[#373D51]"
                  onClick={() => clearPage()}
                >
                  <div className=" flex items-center gap-x-2">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.67414 1.1875C6.67414 0.93213 6.59565 0.722778 6.43868 0.559445C6.28295 0.394815 6.08334 0.3125 5.83985 0.3125C5.59636 0.3125 5.39675 0.394815 5.24102 0.559445C5.08405 0.722778 5.00556 0.93213 5.00556 1.1875V5.125H1.25128C1.00779 5.125 0.808179 5.20731 0.652446 5.37194C0.495477 5.53528 0.416992 5.74463 0.416992 6C0.416992 6.25537 0.495477 6.46472 0.652446 6.62806C0.808179 6.79269 1.00779 6.875 1.25128 6.875H5.00556V10.8125C5.00556 11.0679 5.08405 11.2772 5.24102 11.4406C5.39675 11.6052 5.59636 11.6875 5.83985 11.6875C6.08334 11.6875 6.28295 11.6052 6.43868 11.4406C6.59565 11.2772 6.67414 11.0679 6.67414 10.8125V6.875H10.4284C10.6719 6.875 10.8715 6.79269 11.0273 6.62806C11.1842 6.46472 11.2627 6.25537 11.2627 6C11.2627 5.74463 11.1842 5.53528 11.0273 5.37194C10.8715 5.20731 10.6719 5.125 10.4284 5.125H6.67414V1.1875Z"
                        fill="white"
                      />
                    </svg>
                    <span className=" text-sm">New Analysis </span>
                  </div>
                </button>
                <button
                  className=" grow-0 toggle-button  text-white w-10 border border-[#484A4E] inline-flex justify-center items-center rounded-md  hover:bg-[#373D51]"
                  onClick={toggleSidebar}
                >
                  {modalOpen ? (
                    <svg
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.895812 6.37194C0.738708 6.55343 0.660156 6.76278 0.660156 7C0.660156 7.23722 0.738708 7.44657 0.895812 7.62806L5.90581 12.8781C6.079 13.0427 6.27878 13.125 6.50516 13.125C6.73153 13.125 6.93132 13.0427 7.1045 12.8781C7.2616 12.6966 7.34016 12.4872 7.34016 12.25C7.34016 12.0128 7.2616 11.8034 7.1045 11.6219L2.66972 7L7.1045 2.37806C7.2616 2.19657 7.34016 1.98722 7.34016 1.75C7.34016 1.51278 7.2616 1.30343 7.1045 1.12194C6.93132 0.957315 6.73153 0.875 6.50516 0.875C6.27878 0.875 6.079 0.957315 5.90581 1.12194L0.895812 6.37194Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 pb-2 text-gray-400 text-sm h-[calc(100%-120px)] px-3 ">
              <CustomScroll
                className="-mx-3"
                heightRelativeToParent="calc(100% - 20px)"
              >
                {Object.keys(groupedVideos).map((dateLabel) => (
                  <div key={dateLabel}>
                    <h5 className="h-9 pb-2 pt-3 px-3 text-xs font-medium text-ellipsis overflow-hidden break-all text-gizmo-gray-600">
                      {dateLabel}
                    </h5>
                    <ul className="">
                      {groupedVideos[dateLabel]?.map((video, index) => (
                        <li
                          className={`relative text-white py-1 px-3   ${
                            activeVideo === video.video_id
                              ? "bg-[#373D51] rounded"
                              : "hover:bg-[#373D51] cursor-pointer"
                          }`}
                          key={video.video_id}
                        >
                          <div className="pl-0 whitespace-nowrap text-xs font-medium pr-2 overflow-x-hidden h-8 flex items-center ">
                            {" "}
                            <div className=" relative overflow-hidden self-center w-full">
                              {videoEdit && videoEdit[video.video_id] ? (
                                <div className=" relative pl-7">
                                  <i className=" absolute left-0 z-0 top-[4px]">
                                    <svg
                                      stroke="currentColor"
                                      fill="currentColor"
                                      strokeWidth="0"
                                      viewBox="0 0 24 24"
                                      className="mr-2 h-4 w-4"
                                      height="1em"
                                      width="1em"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g id="Edit">
                                        <g>
                                          <path d="M3.548,20.938h16.9a.5.5,0,0,0,0-1H3.548a.5.5,0,0,0,0,1Z"></path>
                                          <path d="M9.71,17.18a2.587,2.587,0,0,0,1.12-.65l9.54-9.54a1.75,1.75,0,0,0,0-2.47l-.94-.93a1.788,1.788,0,0,0-2.47,0L7.42,13.12a2.473,2.473,0,0,0-.64,1.12L6.04,17a.737.737,0,0,0,.19.72.767.767,0,0,0,.53.22Zm.41-1.36a1.468,1.468,0,0,1-.67.39l-.97.26-1-1,.26-.97a1.521,1.521,0,0,1,.39-.67l.38-.37,1.99,1.99Zm1.09-1.08L9.22,12.75l6.73-6.73,1.99,1.99Zm8.45-8.45L18.65,7.3,16.66,5.31l1.01-1.02a.748.748,0,0,1,1.06,0l.93.94A.754.754,0,0,1,19.66,6.29Z"></path>
                                        </g>
                                      </g>
                                    </svg>
                                  </i>
                                  <input
                                    autoFocus
                                    value={editTitle}
                                    maxLength={30}
                                    onChange={(e) =>
                                      setEditTitle(e.target.value)
                                    }
                                    onKeyPress={(e) => updateVideoTitle(e)}
                                    className="h-5 !bg-transparent border border-blue-400 text-white placeholder:text-gray-400  w-[90%] 
                                  outline-none "
                                  />
                                </div>
                              ) : (
                                <div
                                  className=" pr-0  h-8 py-2 "
                                  onClick={(event) => {
                                    event.preventDefault();
                                    getVideoDetail(video.video_id);
                                  }}
                                >
                                  <a href="/">
                                    <i className=" absolute left-0 z-0 top-2">
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M5.14551 10.833C5.52017 10.8525 5.83884 10.9893 6.10151 11.2434C6.34551 11.517 6.47684 11.849 6.49551 12.2393V12.708L8.54951 11.1268C8.77351 10.9309 9.03551 10.833 9.33551 10.833H13.2455C13.5268 10.8136 13.6768 10.6573 13.6955 10.3643V1.92676C13.6768 1.6337 13.5268 1.47745 13.2455 1.45801H2.44551C2.16417 1.47745 2.01417 1.6337 1.99551 1.92676V10.3643C2.01417 10.6573 2.16417 10.8136 2.44551 10.833H5.14551ZM6.49551 14.4663L6.35551 14.583L5.87751 14.9643C5.72684 15.0615 5.56751 15.0712 5.39951 14.9934C5.23017 14.9156 5.14551 14.7788 5.14551 14.583V13.9684V13.7622V13.6455V12.2393H3.79551H2.44551C1.93884 12.2198 1.51684 12.0344 1.17951 11.683C0.842175 11.3316 0.664174 10.892 0.645508 10.3643V1.92676C0.664174 1.39898 0.842175 0.959397 1.17951 0.608008C1.51684 0.256619 1.93884 0.0712023 2.44551 0.0517578H13.2455C13.7522 0.0712023 14.1742 0.256619 14.5115 0.608008C14.8488 0.959397 15.0268 1.39898 15.0455 1.92676V10.3643C15.0268 10.892 14.8488 11.3316 14.5115 11.683C14.1742 12.0344 13.7522 12.2198 13.2455 12.2393H9.33551L6.49551 14.4663Z"
                                          fill="white"
                                        />
                                      </svg>
                                    </i>
                                    {otherData.enableTypeWritter &&
                                    index === 0 &&
                                    dateLabel == "Today" ? (
                                      <div className="pl-6">
                                        <Typewriter
                                          options={{
                                            strings: video.name,
                                            autoStart: true,
                                            loop: false,
                                            delay: 100,
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      <div className=" pl-6 text-ellipsis overflow-hidden">
                                        {video.name}
                                      </div>
                                    )}
                                  </a>
                                </div>
                              )}
                            </div>
                            {videoLoading && videoLoading[video.video_id] ? (
                              <Spinner
                                className=" absolute right-5 z-20 top-2"
                                aria-label="Default status example"
                              />
                            ) : null}
                          </div>

                          {activeVideo === video.video_id ? (
                            <Dropdown
                              label=""
                              dismissOnClick={false}
                              renderTrigger={() => (
                                <span className=" absolute right-2 top-1.5 z-20">
                                  <button
                                    className="inline-flex items-center p-1.5 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-transparent dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                    type="button"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 4 15"
                                    >
                                      <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                    </svg>
                                  </button>
                                </span>
                              )}
                            >
                              <Dropdown.Item
                                icon={CiEdit}
                                onClick={() => {
                                  openEditBox(video.video_id, video.name);
                                }}
                              >
                                Rename
                              </Dropdown.Item>
                              <Dropdown.Item
                                icon={CiTrash}
                                onClick={() => {
                                  confirmAlert({
                                    title: "Delete video?",
                                    message:
                                      "This will delete Video and Chats.",
                                    buttons: [
                                      {
                                        label: "Yes",
                                        onClick: () =>
                                          removeVideoHistory(video.video_id),
                                      },
                                      {
                                        label: "No",
                                        //onClick: () => alert('Click No')
                                      },
                                    ],
                                  });
                                }}
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown>
                          ) : (
                            ""
                          )}

                          <div className="absolute bottom-0 right-0 top-0 w-16 bg-gradient-to-l from-[#1B212E] via-[#1B212E]/50 to-[#1B212E]/30 hidden"></div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CustomScroll>
            </div>

            <div className="flex flex-col empty:hidden border-[#262626] h-[60px] bg-[#26313F] border-r">
              <button
                id="dropdownAvatarNameButton"
                data-dropdown-toggle="dropdownAvatarName"
                className="flex items-center text-sm font-medium text-white rounded-full h-full w-full pl-3 justify-between"
                type="button"
              >
                <span className=" inline-flex pe-1 items-center gap-1">
                  <span className="sr-only">Open user menu</span>
                  {/* <Image
                    className="w-8 h-8 me-2 rounded-lg"
                    src="/images/2.jpg"
                    alt="user photo"
                    width={50}
                    height={50}
                  /> */}

                  <Avatar size={"sm"} rounded />
                  <div className="truncate max-w-[175px] text-sm ">
                    <span>{loggedInUser}</span>
                  </div>
                </span>

                <span className="">
                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    className=" mt-1 bg-[#1a212f]  border-[#344054]  py-0 "
                    renderTrigger={() => (
                      <div className="inline-flex items-center  text-xl w-8 h-8  bg-transparent justify-center  rounded-md ">
                        <svg
                          width="13"
                          height="15"
                          viewBox="0 0 13 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.18359 7.05176C1.2009 6.46842 1.44377 6.03092 1.9122 5.73926C2.39918 5.44759 2.88615 5.44759 3.37313 5.73926C3.84157 6.03092 4.08505 6.46842 4.10359 7.05176C4.08505 7.63509 3.84157 8.07259 3.37313 8.36426C2.88615 8.65592 2.39918 8.65592 1.9122 8.36426C1.44377 8.07259 1.2009 7.63509 1.18359 7.05176ZM5.35502 7.05176C5.37233 6.46842 5.6152 6.03092 6.08363 5.73926C6.57061 5.44759 7.05758 5.44759 7.54456 5.73926C8.01299 6.03092 8.25648 6.46842 8.27502 7.05176C8.25648 7.63509 8.01299 8.07259 7.54456 8.36426C7.05758 8.65592 6.57061 8.65592 6.08363 8.36426C5.6152 8.07259 5.37233 7.63509 5.35502 7.05176ZM10.9855 5.52148C11.5417 5.53963 11.9589 5.79435 12.237 6.28565C12.515 6.79639 12.515 7.30713 12.237 7.81787C11.9589 8.30917 11.5417 8.56454 10.9855 8.58398C10.4293 8.56454 10.0122 8.30917 9.7341 7.81787C9.456 7.30713 9.456 6.79639 9.7341 6.28565C10.0122 5.79435 10.4293 5.53963 10.9855 5.52148Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    )}
                  >
                    <Dropdown.Item className="text-white" onClick={logOut}>
                      Log out
                    </Dropdown.Item>
                  </Dropdown>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
