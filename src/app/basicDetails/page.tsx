"use client";
import React, { useEffect, useState } from "react";
import {
  FECallApi,
  callApi,
  checkLogin,
  callApiData,
} from "../services/apiUtils";
import { useRouter } from "next/navigation";
import LandingLayout from "../layout/LandingLayout";
import { FaRegUser } from "react-icons/fa";
import { HiOutlinePlus } from "react-icons/hi";
import InterestCheckboxes from "../components/InterestCheckboxes";
import ComonToast from "../components/ComonToast";
import Image from "next/image";

const UserForm = () => {
  const footerClass = "!relative";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [alreadySelectedInterests, setAlreadySelectedInterests] = useState<
    string[]
  >([]);
  const [interests, setInterests] = useState<string[]>([]);

  const [interestOptions, setInterestOptions] = useState([]);
  const [toastObj, setToastObj] = useState({ type: "", msg: "" });
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: any) => {
    setPhone(e.target.value);
  };

  const handleGenderChange = (e: any) => {
    setGender(e.target.value);
  };

  const handleDobChange = (e: any) => {
    setDob(e.target.value);
  };

  const handleProfileImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(file);
        let previewImageData: string | null = null;
        if (typeof reader.result === "string") {
          previewImageData = reader.result;
        }
        setPreviewImage(previewImageData);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImage(null);
      setPreviewImage(null);
    }
  };

  const handleInterestChange = (e: any) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter((interest) => interest !== value));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate form data
    if (!name || !gender || !dob) {
      setToastObj({ type: "e", msg: "Please fill in all required fields" });
      return;
    }
    const token = localStorage.getItem("athlabsAuthToken");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("gender", gender);
    formdata.append("dob", dob);
    if (interests.length === 0) {
      formdata.append("interests", "empty");
    } else if (interests.join(",") !== alreadySelectedInterests.join(",")) {
      formdata.append("interests", interests.join(","));
    }
    if (profileImage) {
      formdata.append("picture", profileImage);
    }

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://api.dev.athlabs.co/u/profile", requestOptions)
      .then((response: any) => response.text())
      .then((data: any) => {
        setAlreadySelectedInterests(interests);
        setToastObj({ type: "s", msg: "Profile successfully updated" });
        setTimeout(() => {
          router.push("/home");
        }, 2000);
      })
      .catch((error) => console.log("error", error));
  };

  const fetchUserData = async () => {
    try {
      const uriString = ``;
      const method = "GET";
      const contentType = "application/json";
      const responseData = await callApi(method, contentType, null, uriString);

      if (responseData.status) {
        setUserData(responseData.data.profile);
        setName(responseData.data.profile.name);
        setDob(responseData.data.profile.dob);
        setGender(responseData.data.profile.gender);
        setPreviewImage(responseData.data.profile.picture);
        const interestNames = responseData.data.profile.interests.map(
          (item: any) => item.name
        );
        setInterests(interestNames);
        setAlreadySelectedInterests(interestNames);
      }

      console.log("User data:", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setToastObj({ type: "e", msg: "Error fetching user data" });
    }
  };

  const fetchInterests = async () => {
    try {
      const uriString = `/i/list`;
      const method = "GET";
      const contentType = "application/json";
      const responseData = await callApi(method, contentType, null, uriString);

      if (responseData.status) {
        const interestNames = responseData.data.map((item: any) => item.name);
        setInterestOptions(interestNames);
      }
    } catch (error) {
      console.error("Error fetching interests:", error);
      setToastObj({ type: "e", msg: "Error fetching interests" });
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchInterests();
  }, []);

  const skipBasicDetails = async () => {
    const uriString = `/u/profile`;
    const method = "POST";
    const contentType = "application/json";
    const header = { accept: "application/json" };
    const body = { new_user: false };
    const responseData = await callApiData(method, header, body, uriString);
    if (responseData.status) {
      router.push("/home");
    } else {
      setToastObj({ type: "e", msg: "Error skipping basic details" });
    }
  };

  const handleSkipNow = (event:any) => {
    event.preventDefault();
    skipBasicDetails();
  };

  return (
    <LandingLayout showButton={false} footerClass={footerClass}>
      <div className="bg-[#04080f] flex items-center justify-center pt-20 sm:pt-40  pb-10 sm:pb-20 min-h-[550px]  2xl:h-[calc(100%-121px)] ">
        <div className="container mx-auto self-center px-6 md:px-8 flex justify-center items-center">
          <form
            className="bg-gray-900 sm:w-7/12 px-12 py-6 rounded-2xl border-[3px]  border-gray-400"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-semibold text-white pb-6 border-gray-700 text-left border-b  mb-5">
              Basic Details
            </h2>
            <div className="-mx-3 flex flex-wrap gap-y-5">
              <div className="w-full px-3  flex justify-center">
                <div>
                  {!previewImage && (
                    <label className=" inline-flex relative mx-auto">
                      <input
                        type="file"
                        id="profileImage"
                        onChange={handleProfileImageChange}
                        accept="image/*"
                        className="w-full absolute opacity-0  rounded-md border border-gray-600 bg-transparent py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                      <span className=" w-24 h-24 inline-flex border rounded-full justify-center items-center text-gray-300 text-4xl cursor-pointer relative">
                        <FaRegUser />
                        <span className=" absolute right-0 bottom-0 w-7 h-7 text-base bg-blue-700 rounded-full text-white inline-flex justify-center items-center">
                          <HiOutlinePlus />
                        </span>
                      </span>
                    </label>
                  )}
                  {previewImage && (
                    <div className="mt-2">
                      <img
                        src={previewImage}
                        alt="Profile Preview"
                        className="  max-w-[100px] rounded-md"
                        crossOrigin="anonymous"
                        width={100}
                        height={100}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full px-3 sm:w-full">
                <label
                  htmlFor="name"
                  className="mb-3 block text-base font-medium text-white/80"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full rounded-md border border-gray-600 bg-transparent py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
              </div>
              {/* <div className="w-full px-3 sm:w-1/2">
                <label
                  htmlFor="phone"
                  className="mb-3 block text-base font-medium text-white/80"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={handlePhoneChange}
                  pattern="[0-9]{10}"
                  className="w-full rounded-md border border-gray-600 bg-transparent py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
              </div> */}

              <div className="w-1/2 px-3 sm:w-1/2">
                <label
                  htmlFor="gender"
                  className="mb-3 block text-base font-medium text-white/80"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={handleGenderChange}
                  className="w-full rounded-md border border-gray-600 bg-transparent py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="w-1/2 px-3 sm:w-1/2">
                <label
                  htmlFor="dob"
                  className="mb-3 block text-base font-medium text-white/80"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={dob}
                  onChange={handleDobChange}
                  className="w-full rounded-md border border-gray-600 bg-transparent py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
              </div>

              <InterestCheckboxes
                interests={interests}
                interestOptions={interestOptions}
                handleInterestChange={handleInterestChange}
              />

              <div className="w-full px-3 my-5 grid gap-x-4 grid-cols-[_1fr_145px] ">
                <button
                  type="submit"
                  className="hover:shadow-form  w-full rounded-md bg-blue-600 hover:bg-blue-700  py-2 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Submit Now
                </button>
                <button
                  className="hover:shadow-form text-center   w-full rounded-md bg-white hover:text-white hover:bg-blue-700  py-2 px-8 text-center text-base font-semibold text-gray-700 outline-none "
                  onClick={handleSkipNow}
                >
                  Skip now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toastObj.type && (
        <ComonToast toastObj={toastObj} setToastObj={setToastObj} />
      )}
    </LandingLayout>
  );
};

export default UserForm;
