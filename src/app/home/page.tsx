"use client";
import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
// import "@/app/globals.css";
import Tabs from "@/app/components/Tabs";
import InputFileUpload from "../components/InputFileUpload";
import Chat from "../components/Chat";
import HomeLayout from "../layout/HomeLayout";
import CustomScroll from "react-custom-scroll";
import { callApi, checkLogin } from "../services/apiUtils";
import { useVideoContext } from "../services/VideoContext";
import moment from "moment";
import Typewriter from "typewriter-effect";
import LoadingComp from "../components/LoadingComp";
import { Accordion, Spinner } from "flowbite-react";
import ProgressBar from "../components/ProgressBar";
import AccordionMy from "../components/AccordionMy";
import FeedBackLodding from "../components/FeedBackLodding";
interface Tab1ContentProps {
  compData: any;
  setName: any;
}

const Tab1Content: React.FC<Tab1ContentProps> = ({ compData, setName }) => {
  const { activeVideoDetail, otherData,setOtherData } = useVideoContext();
  const [historyData, setHistoryData] = useState<any>(null);
  const [score, setScore] = useState<any>(0);
  const [scoreValue, setScoreValue] = useState<any>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [highlight, setHighlight] = useState<any>(null);
  const [items, setItems] = useState<Array<any>>([]);
  const [isFeedbackWritten, setIsFeedbackWritten] = useState(false);
  const [isHighlightWritten, setIsHighlightWritten] = useState(false);

  const Content: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
    <div>
      <p>This content is {isOpen ? "open" : "closed"}.</p>
    </div>
  );

  const resetAnalysis = () => {
    setScore(0);
    setFeedback("");
    setHighlight("");
    setName("");
    setIsFeedbackWritten(false);
    setItems([
      {
        id: 1,
        title: "Feedback",
        content: feedback ? feedback : <FeedBackLodding fetchFeedback={fetchFeedback} fetchHighlight={fetchHighlight}/>,
      },
      {
        id: 2,
        title: "Highlight",
        content: feedback && highlight ? highlight : <FeedBackLodding fetchFeedback={fetchFeedback} fetchHighlight={fetchHighlight}/>,
      },
    ]);
  };

  const fetchHistory = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_HOST;
    const apiEndpoint = `${apiUrl}/h/${activeVideoDetail.video_id}`;

    const headers = {
      Authorization: `Bearer ${checkLogin()}`, // Replace with your actual token
    };

    const response: any = await fetch(apiEndpoint, { headers });

    const data = await response.json();
    console.log(data, "data");
    if (data.feedback === null) {
      feedBackNotFetch();
    }
    else if (data.feedback && data.highlight) {
      setHistoryData(data);
    }
  };

  const fetchFeedbackOld = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_HOST;
    const apiEndpoint = `${apiUrl}/feedback/${activeVideoDetail.video_id}`;

    const headers = {
      Authorization: `Bearer ${checkLogin()}`, // Replace with your actual token
    };

    const response: any = await fetch(apiEndpoint, { headers });

    const reader = response.body.getReader();

    let receivedData = "";
    const processStream = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const decodedValue = new TextDecoder().decode(value);
        receivedData += decodedValue.replace(/data:/g, "");
        setFeedback(receivedData);
      }
      fetchHighlight();
    };

    processStream();
  };

  const fetchFeedback = async () => {
     /*this condition is for if video is just uplaoded and chat start 
      *at that time feedback is not required to fetch again
     */
    //  if(otherData.justUploadVideo && otherData.textAfterUploadVideo){
    //   return
    //  }
     /*End of condition*/
    const apiUrl = process.env.NEXT_PUBLIC_API_HOST;
    const apiEndpoint = `${apiUrl}/feedback/${activeVideoDetail.video_id}`;

    const headers = {
      Authorization: `Bearer ${checkLogin()}`, // Replace with your actual token
    };

    try {
      const response = await fetch(apiEndpoint, { headers });
      if (!response.ok) {
        feedBackNotFetch();
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      if (responseData.feedback === null || responseData.feedback === "") {
      feedBackNotFetch();  // Call to show regenerate button
    }
      const formattedText = processFeedback(responseData.feedback);
      setFeedback(formattedText);

      setScore(responseData.score);

      if (responseData.name && !activeVideoDetail.name) {
        setName(responseData.name);
      }
      fetchHighlight(); // Assuming fetchHighlight is defined elsewhere
      feedBackFetched(); //hide regnerate response button if enable
    } catch (error) {
      console.error("Error fetching feedback:", error);
      // Handle error as needed
      feedBackNotFetch();
    }
  };

  const fetchHighlight = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_HOST;
    const apiEndpoint = `${apiUrl}/highlight/${activeVideoDetail.video_id}`;

    const headers = {
      Authorization: `Bearer ${checkLogin()}`, // Replace with your actual token
    };

    const response: any = await fetch(apiEndpoint, { headers });
    if (response.ok) {
      const data = await response.json();
      setHighlight(data.highlight);
      highLightFetched();
    }else {
      highLightNotFetch()
      console.error('Failed to fetch:', response.statusText);
      throw new Error('Failed to fetch data');
    }
    /* setScore(data.score);

    if (data.name && !activeVideoDetail.name) {
      setName(data.name);
    } */
  };

  const updateItems = () => {
    const newItems = [];

    // Check if feedback is not empty, then update items array
    newItems.push({
      id: 1,
      title: "Feedback",
      content: feedback ? feedback : <FeedBackLodding fetchFeedback={fetchFeedback} fetchHighlight={fetchHighlight}/>,
    });

    // Check if feedback and highlight are not empty, then update items array
    newItems.push({
      id: 2,
      title: "Highlight",
      content: feedback && highlight ? highlight : <FeedBackLodding fetchFeedback={fetchFeedback} fetchHighlight={fetchHighlight}/>,
    });

    // Update the items state with the newItems array
    setItems(newItems);
  };

  const updateHistoryItems = () => {
    if (historyData) {
      const { score, feedback, highlight } = historyData;
      const newItems = [];

      setTimeout(() => {
        setScore(score);
      }, 500);

      newItems.push({
        id: 1,
        title: "Feedback",
        content:
          feedback &&
          items.findIndex((item) => item.title === "Feedback") !== -1
            ? (items[0].content = processFeedback(feedback))
            : processFeedback(feedback),
      });

      newItems.push({
        id: 2,
        title: "Highlight",
        content:
          highlight &&
          items.findIndex((item) => item.title === "Highlight") !== -1
            ? (items[1].content = processHighlight(highlight))
            : processHighlight(highlight),
      });

      setItems(newItems);
    }
  };

  // Feedback Processing
  function processFeedback(feedback: string) {
    // Make anything in **bold** actually bold
     feedback = feedback.replace(/\*\*(.*?)\*\*/g, "$1");
    /* if (!feedback) return ""; // Check if feedback is defined

    // Replace excessive spaces with a single space
    feedback = feedback.replace(/\s{2,}/g, " ");
    // Add bullet points for each improvement suggestion
    feedback = feedback.replace(
      /Improvementsuggestions:/g,
      "\nImprovement Suggestions:\n"
    );
    feedback = feedback.replace(/(\d+\.[^\d]+)/g, "- $1\n");
    // Add a period at the end of the sentence if it's missing
    feedback = feedback.replace(/Overall,/g, "Overall."); */

    return feedback;
  }

  // Highlight Processing
  function processHighlight(highlight: string) {
   /*  if (!highlight) return ""; // Check if highlight is defined

    // Replace excessive spaces with a single space
    highlight = highlight.replace(/\s{2,}/g, " ");
    // Add proper spacing and punctuation
    highlight = highlight.replace(/Key Points:/g, "\nKey Points:\n");
    highlight = highlight.replace(/Improvements:/g, "\nImprovements:\n");
    highlight = highlight.replace(/Risk of injury:/g, "\nRisk of Injury:\n");
    highlight = highlight.replace(/Overall,/g, "\nOverall,");
    highlight = highlight.replace(/\./g, ".\n"); */

    return highlight;
  }

  useEffect(() => {
    console.log('useEffect',otherData)
    resetAnalysis();
    if (activeVideoDetail?.video_id && otherData.fetchVideoHistroy) {
      fetchHistory();
    } else if (activeVideoDetail?.video_id) {
      fetchFeedback();
    }
  }, [activeVideoDetail]);

  useEffect(() => {
    updateItems();
  }, [highlight, feedback, isFeedbackWritten]);

  useEffect(() => {
    updateHistoryItems();
  }, [historyData]);

  const feedBackNotFetch  = ()=>{
    setOtherData((prevData: any) => ({
      ...prevData,
      feedBackRespond: 'feedback'
    }));
  }

  const feedBackFetched  = ()=>{
    setOtherData((prevData: any) => ({
      ...prevData,
      feedBackRespond: null
    }));
  }

  const highLightNotFetch  = ()=>{
    setOtherData((prevData: any) => ({
      ...prevData,
      highLightRespond: 'highlight'
    }));
  }

  const highLightFetched  = ()=>{
    setOtherData((prevData: any) => ({
      ...prevData,
      highLightRespond: null
    }));
  }

  return (
    <div className=" landscape:min-h-[300px]  lg:h-[calc(100vh-200px)]">
      {activeVideoDetail ? (
        <div className=" bg-[#171717] text-white p-4 rounded-xl  font-normal leading-7  landscape:h-[300px] landscape:lg:h-[calc(100vh-200px)] h-[calc(100vh-200px)]">
          <CustomScroll
            className="-mx-3 "
            heightRelativeToParent="calc(100% - 0px)"
          >
            {/* <div className=" px-3 " style={{ whiteSpace: "pre-line" }}>
              {activeVideoDetail.feedback}
            </div> */}

            {/* {((highlight && isHighlightWritten && score) ||
              (!highlight && score)) && ( */}
            <div className=" mb-4">
            Performance Score: {score !== null ? score : ""}

              <ProgressBar
                progress={score !== null ? score : 100}
                height="30px"
                backgroundColor="#777"
                progressColor="#44366a"
                progressTextColor="#fff"
                className="my-custom-class"
              />
            </div>
            {/* )} */}
            <AccordionMy items={items} />
          </CustomScroll>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
const Tab2Content = () => {
  const [formErrors, setFormErrors] = useState({ textMsg: "" });
  const [textMsg, setText] = useState("");
  const { activeVideoDetail, otherData,setOtherData } = useVideoContext();
  const { setActiveVideoData } = useVideoContext();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<any>(null);

  const validateForm = () => {
    let valid = true;
    const errors = { textMsg: "" };
    if (!textMsg) {
      errors.textMsg = "Message is required";
      valid = false;
    }
    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: any) => {
    // if(otherData.justUploadVideo){
    //   setOtherData((prevData: any) => ({
    //     ...prevData,
    //     textAfterUploadVideo: true
    //   }));
    // }


    e.preventDefault();
    let videoId = activeVideoDetail.video_id;
    if (validateForm() && videoId) {
      let userMsg = {
        text: textMsg,
        sender: "user",
        timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
      };
      const updatedData = { ...activeVideoDetail };
      updatedData.messages = updatedData.messages || [];

      console.log(userMsg, "userMsg");

      updatedData.messages.push(userMsg);
      //if(!otherData.justUploadVideo){
        setActiveVideoData(updatedData);
      //}
      setText("");
      setLoading(true);
      const uriString = `/c/${videoId}`;
      const method = "POST";
      const contentType = "application/x-www-form-urlencoded";
      const formData = new URLSearchParams();
      formData.append("text", textMsg);
      const responseData = await callApi(
        method,
        contentType,
        formData,
        uriString
      );
      if (responseData.status) {
        console.log('responseData',responseData)
        const updatedData1 = { ...activeVideoDetail };
        updatedData1.messages = updatedData1.messages || [];

        /**When first time video upload and start text message at that first time I append user msg with text message come from AI
         * After that not so for that purpose I used appendTextzMsg and after first I set to false.
         */
        if(otherData.justUploadVideo && otherData.appendTextzMsg){
          updatedData1.messages.push(userMsg);
          setOtherData((prevData: any) => ({
            ...prevData,
            appendTextzMsg: false
          }));
        }
        const aiResponse = {
          text: responseData.data.text,
          sender: responseData.data.sender,
          timestamp: responseData.data.timestamp
        };

        updatedData1.messages.push(aiResponse);
        //if(!otherData.justUploadVideo){
          setActiveVideoData(updatedData1);
        //}
        setLoading(false);
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        console.log(responseData);
        setLoading(false);
      }
    } else {
      console.log("Either video_id is empty or validation failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormErrors({ textMsg: "" });
  }, [activeVideoDetail]);

  return (
    <div className=" flex  landscape:h-[300px] landscape:lg:h-[calc(100vh-200px)] h-[calc(100vh-200px)] lg:h-full w-full">
      <div className=" flex flex-col w-full h-full justify-between">
        <div className="h-[calc(100%-70px)]">
          <CustomScroll
            className="-mx-2"
            heightRelativeToParent="calc(100% - 0px)"
          >
            <Chat />
          </CustomScroll>
        </div>
        <div className=" ">
          <div className=" inline-flex  w-full flex-col">
            <form
              className=" relative w-full"
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <input
                type="text"
                className=" h-11  px-5 w-full pr-16 bg-[#2F3747]  border border-white/40  rounded-lg

                   ring-0 ring-inset ring-gray-300 text-white placeholder:text-gray-400 focus:ring-0 outline-none focus:ring-inset focus:ring-indigo-600
                  "
                placeholder="Type your message here..."
                value={textMsg}
                onChange={(e) => setText(e.target.value)}
              />

              {loading ? (
                <div className="absolute right-2.5 top-2.5">
                  <Spinner aria-label="Default status example" />
                </div>
              ) : (
                <button
                  className=" absolute right-5 top-1/2 transform -translate-y-1/2 text-white hover:text-cyan-500"
                  type="submit"
                >
                  <svg
                    width="31"
                    height="28"
                    viewBox="0 0 31 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.2928 26.8458C30.0078 27.1868 29.625 27.432 29.1961 27.5484C28.7673 27.6648 28.313 27.6467 27.8947 27.4965L16.9641 23.7559C16.8559 23.7191 16.762 23.6493 16.6956 23.5564C16.6291 23.4634 16.5934 23.352 16.5935 23.2378V13.4063C16.5939 13.2564 16.5634 13.108 16.5039 12.9703C16.4445 12.8327 16.3574 12.7087 16.248 12.6061C16.1387 12.5036 16.0094 12.4246 15.8682 12.3741C15.727 12.3236 15.577 12.3026 15.4273 12.3126C15.1461 12.3374 14.8846 12.4675 14.6952 12.6769C14.5058 12.8863 14.4025 13.1595 14.406 13.4419V23.2268C14.4063 23.3409 14.3708 23.4522 14.3046 23.5451C14.2384 23.638 14.1448 23.7079 14.0369 23.745L3.09941 27.4965C2.68014 27.6435 2.22607 27.6593 1.79762 27.5418C1.36916 27.4243 0.986623 27.1792 0.700898 26.839C0.415174 26.4988 0.239806 26.0797 0.198126 25.6374C0.156446 25.1951 0.25043 24.7505 0.467573 24.363L13.5857 1.39284C13.776 1.05455 14.0529 0.772991 14.388 0.577047C14.723 0.381103 15.1041 0.277832 15.4923 0.277832C15.8804 0.277832 16.2616 0.381103 16.5966 0.577047C16.9317 0.772991 17.2085 1.05455 17.3988 1.39284L30.5252 24.3561C30.7476 24.7445 30.8447 25.1921 30.8031 25.6377C30.7615 26.0834 30.5832 26.5053 30.2928 26.8458Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              )}
            </form>

            {formErrors.textMsg && (
              <span>
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.textMsg}
                </p>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface Tab {
  id: string;
  label: string;
  content: JSX.Element; // Or replace with the appropriate type for content
}

const AdminPage = () => {
  const [dataFromChild, setDataFromChild] = useState(null);
  const { activeVideoDetail } = useVideoContext();
  const [name, setName] = useState("");
  const tabs: Tab[] = [
    {
      id: "tab1",
      label: "Analysis",
      content: <Tab1Content compData={dataFromChild} setName={setName} />,
    },
  ];

  if (activeVideoDetail) {
    tabs.push({ id: "tab2", label: "Chat", content: <Tab2Content /> });
  }

  const handleChildData = (childData: any) => {
    console.log("childData", childData);
    setDataFromChild(childData.feedback);
  };

  return (
    <HomeLayout>
      <div className="flex w-full  px-6 pt-0">
        <div className="flex w-full flex-col lg:flex-row  gap-x-5  gap-y-7 lg:gap-y-2  pb-5 lg:py-0">
          <div className="flex flex-col items-left relative w-full lg:w-8/12 rounded-md xl:rounded-xl 2xl:rounded-xl overflow-hidden">
            {!activeVideoDetail?.video_url ? (
              <div className=" flex flex-col">
                <InputFileUpload onDataFromChild={handleChildData} />
              </div>
            ) : (
              <div className=" landscape:min-h-screen landscape:lg:min-h-[calc(100vh-100px)] landscape:lg:h-[calc(100vh-100px)]  min-h-[300px] lg:min-h-[462px]  lg:h-[calc(100vh-100px)] bg-[#1B212E]  rounded-xl flex justify-between flex-col ">
                <video
                  playsInline
                  controls
                  className=" landscape:h-[calc(100vh-45px)] landscape:w-auto landscape:lg:h-[calc(100%-66px)] lg:h-[calc(100%-66px)] my-auto mx-auto"
                  key={activeVideoDetail?.video_url}
                >
                  <source src={activeVideoDetail?.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div
                  className=" text-lg px-5 flex items-center min-h-[66px] drop-shadow-xl  border-t border-gray-900  bg-[#26313F]  "
                  style={{ color: "#fff" }}
                >
                  {activeVideoDetail.name || name}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col relative bg-[#1B212E]  w-full lg:w-4/12 rounded-xl ">
            <div className=" landscape:lg:h-[calc(100vh-100px)]  landscape:lg:min-h-[calc(100vh-100px)] lg:min-h-[462px]  lg:h-[calc(100vh-100px)] bg-[#1B212E]  rounded-xl">
              <Tabs tabs={tabs} />
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AdminPage;
