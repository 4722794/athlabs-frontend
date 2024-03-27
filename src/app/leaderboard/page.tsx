"use client";
import MyGridComponent from "../components/MyGridComponent";
import Tabs from "../components/Tabs";
import LandingLayout from "../layout/LandingLayout";

function Leaderboard() {
  const footerClass = "!relative";

  const columnDefs = [
    { headerName: "ID", field: "id", width: 90 },
    { headerName: "Name", field: "name", flex: 1 },
    { headerName: "Activity", field: "activity", flex: 1 },
    { headerName: "Score", field: "score", flex: 1 },
  ];

  const rowData = [
    { id: 1, name: "Toyota", activity: "Celica", score: 35000 },
    { id: 1, name: "Ford", activity: "Mondeo", score: 32000 },
    { id: 1, name: "Porsche", activity: "Boxster", score: 72000 },
  ];

  const tabsData = [
    {
      id: "Public",
      label: "Public",
      content: (
        <div className=" text-white">
          <MyGridComponent columnDefs={columnDefs} rowData={rowData} />
        </div>
      ),
    },
    {
      id: "Personal",
      label: "Personal",
      content: <div className=" text-white">Content for Tab 2</div>,
    },
  ];

  return (
    <LandingLayout showButton={false} footerClass={footerClass}>
      <div className="bg-[#04080f] pt-20 2xl:pt-24 ">
        <div className="container mx-auto self-center px-6 md:px-8  md:pt-12 flex justify-between items-center">
          <div className=" landscape:lg:h-[calc(100vh-250px)]  landscape:lg:min-h-[calc(100vh-250px)]  min-h-[calc(100vh-250px)] lg:min-h-[422px]  lg:h-[calc(100vh-250px)] bg-[#1B212E]  rounded-xl w-full">
            <Tabs tabs={tabsData} />
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}

export default Leaderboard;
