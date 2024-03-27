"use client";
import LandingLayout from "../layout/LandingLayout";

function Leaderboard() {
  const footerClass = "!relative";

  return (
    <LandingLayout showButton={false} footerClass={footerClass}>
      <div className="bg-[#04080f] pt-20 2xl:pt-24">
        <div className="container mx-auto self-center px-6 md:px-8 flex justify-between items-center"></div>
      </div>
    </LandingLayout>
  );
}

export default Leaderboard;
