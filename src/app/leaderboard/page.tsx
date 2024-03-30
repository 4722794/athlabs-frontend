"use client";
import { useEffect, useState } from "react";
import MyGridComponent from "../components/MyGridComponent";
import Tabs from "../components/Tabs";
import LandingLayout from "../layout/LandingLayout";
import { IoRefresh } from "react-icons/io5";
import { callApi, checkLogin } from "../services/apiUtils";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null); // Assume this is set from an authentication service

  const footerClass = "!relative";

  const columnDefs = [
    // { headerName: "ID", field: "id", width: 90 },
    { headerName: "Name", field: "name", flex: 1 },
    { headerName: "Activity", field: "activity", flex: 1 },
    { headerName: "Score", field: "score", flex: 1 },
  ];

  const tabsData = [
    {
      id: "Public",
      label: "Public",
      content: (
        <div className=" text-white">
          <MyGridComponent columnDefs={columnDefs} rowData={leaderboardData} />
        </div>
      ),
    },
    // {
    //   id: "Personal",
    //   label: "Personal",
    //   content: (
    //     <div className=" text-white">
    //       <MyGridComponent
    //         columnDefs={columnDefs}
    //         rowData={
    //           loggedInUser
    //             ? leaderboardData.filter(
    //                 (entry) => entry.author === loggedInUser
    //               )
    //             : []
    //         }
    //       />
    //     </div>
    //   ),
    // },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_HOST;
      const apiEndpoint = `${apiUrl}/leaderboard`;

      try {
        const response = await fetch(`${apiEndpoint}`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${checkLogin()}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const sortedData = data.sort((a: any, b: any) => b.score - a.score);
        // setLeaderboardData(sortedData.slice(0, 20)); // Only keep the top 20 entries
        setLeaderboardData(sortedData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRefresh = async () => {
    setLoading(true); // Set loading state to true to indicate data is being fetched
    const apiUrl = process.env.NEXT_PUBLIC_API_HOST;
    const apiEndpoint = `${apiUrl}/leaderboard`;

    try {
      const response = await fetch(apiEndpoint, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${checkLogin()}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const sortedData = data.sort((a: any, b: any) => b.score - a.score);
      setLeaderboardData(sortedData); // Set all the leaderboard data
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <LandingLayout showButton={false} footerClass={footerClass}>
      <div className="bg-[#04080f] pt-20 2xl:pt-24 ">
        <div className="container mx-auto self-center px-6 md:px-8  md:pt-8 flex justify-between items-center">
          <div className=" landscape:lg:h-[calc(100vh-250px)]  landscape:lg:min-h-[calc(100vh-250px)]  min-h-[calc(100vh-250px)] lg:min-h-[422px]  lg:h-[calc(100vh-250px)] bg-[#1B212E]  rounded-xl w-full">
            <div className=" flex justify-between px-5 pt-3 items-center">
              <h3 className=" text-white text-2xl">Leaderboard</h3>
              <button
                onClick={handleRefresh}
                className=" text-white border px-5 py-2 rounded-3xl hover:bg-[#2F3747] hover:border-[#2F3747] inline-flex items-center"
              >
                <IoRefresh className="text-2xl mr-2" />
                Refresh
              </button>
            </div>
            <Tabs tabs={tabsData} />

            {loading && <div>Loading...</div>}
            {error && <div>Error.</div>}
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}

export default Leaderboard;
