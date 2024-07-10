import React from "react";

const InterestCheckboxes = ({ interests, interestOptions, handleInterestChange }) => {
  // const interestOptions = ["Fitness", "Sports", "Yoga", "Athletics"];
  console.log(interests)
  return (
    <div className="w-full px-3">
      <label className="mb-3 block text-base font-medium text-white/80">
        Interests
      </label>
      <div className="flex flex-wrap gap-x-3 gap-y-3">
        {interestOptions.map((option) => (
          <label
            key={option}
            className={`text-white inline-flex gap-x-2 items-center border border-gray-500 px-5 py-2 rounded-3xl relative ${
              interests? interests===option ? "bg-gray-700 border-gray-700" : "" : ""
            }`}
          >
            <input
              type="radio" // Change this to radio
              name="interests" // Add a name attribute to group them
              value={option}
              onChange={handleInterestChange}
              checked={interests === option}
              className="absolute opacity-0"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default InterestCheckboxes;
