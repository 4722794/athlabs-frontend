"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import CustomScroll from "react-custom-scroll";
import "react-custom-scroll/dist/customScroll.css";
import { callApi } from "../services/apiUtils";
import { useVideoContext } from "../services/VideoContext";

interface SidebarProps {
  modalOpen: boolean;
  toggleSidebar: () => void;
}

interface GroupedVideos {
  [key: string]: any[] | undefined;
}

const Sidebar: React.FC<SidebarProps> = ({ modalOpen, toggleSidebar }) => {
  const [videoData, setVideoData] = useState([]);
  const [activeVideo, setactiveVideo] = useState(false);
  const { setActiveVideoData } = useVideoContext();

  useEffect(() => {
    getVideoHistory();
  }, []);

  const getVideoHistory = async () => {
    const uriString = ``;
    const method = "GET";
    const contentType = "application/json";
    const responseData = await callApi(method, contentType, null, uriString);
    if (responseData.status) {
      setVideoData(responseData.data.videos);
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
    const uriString = `/h/${videoId}`;
    const method = "GET";
    const contentType = "application/json";
    const responseData = await callApi(method, contentType, null, uriString);
    if (responseData.status) {
      // console.log(responseData);
      setactiveVideo(videoId);
      setActiveVideoData(responseData.data);
    }
  };

  const clearPage = () => {
    setActiveVideoData(null); 
    console.log('aaaaaa')
  };

  return (
    <div
      className={`dark flex-shrink-0  bg-[#1B212E] absolute h-full z-40 lg:relative  ${
        modalOpen ? " w-[260px] visible" : " w-0 invisible"
      }`}
    >
      <div className="h-full w-[260px]">
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex h-full min-h-0 flex-col transition-opacity opacity-100">
            <div className="sticky left-0 right-0 top-0 z-20 bg-[#1B212E] py-2.5 min-h-[56px]">
              <div className=" flex justify-between px-3 gap-x-3">
                <button className=" grow  text-white border border-[#484A4E] px-3 py-2.5" onClick={()=>clearPage()}>
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
                  className=" grow-0 toggle-button  text-white w-10 border border-[#484A4E] inline-flex justify-center items-center "
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
                      {groupedVideos[dateLabel]?.map((video) => (
                        <li
                          className={`relative text-white py-2.5 px-3 overflow-x-hidden hover:bg-[#171717] cursor-pointer ${
                            activeVideo === video.id ? "bg-[#171717]" : ""
                          }`}
                          key={video.id}
                        >
                          <i className=" absolute left-3 z-0">
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
                          <div className="pl-6 whitespace-nowrap text-xs font-medium pr-2 overflow-x-hidden">
                            {" "}
                            <a
                              href={"#"}
                              onClick={() => getVideoDetail(video.video_id)}
                            >
                              {video.name}
                            </a>
                          </div>
                          <div className="absolute bottom-0 right-0 top-0 w-16 bg-gradient-to-l from-[#1B212E] via-[#1B212E]/50 to-[#1B212E]/30"></div>
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
                className="flex items-center text-sm font-medium text-white rounded-full h-full w-full px-3 justify-between"
                type="button"
              >
                <span className=" inline-flex pe-1 items-center">
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="w-8 h-8 me-2 rounded-lg"
                    src="/images/2.jpg"
                    alt="user photo"
                    width={50}
                    height={50}
                  />
                  Bonnie Green
                </span>
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
