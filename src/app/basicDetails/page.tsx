"use client";
import React, { useEffect, useState } from "react";
import { checkLogin } from "../services/apiUtils";
import { useRouter } from "next/navigation";
import LandingLayout from "../layout/LandingLayout";

const UserForm = () => {
  const footerClass = "!relative";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [interests, setInterests] = useState([]);
  const [toastObj, setToastObj] = useState({ type: "", msg: "" });
  const router = useRouter();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleInterestChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter((interest) => interest !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!name || !phone || !gender || !dob) {
      setToastObj({ type: "error", msg: "Please fill in all required fields" });
      return;
    }

    // Create form data object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("profileImage", profileImage);
    formData.append("interests", JSON.stringify(interests));

    // Send form data to server (replace with your API call)
    fetch("/api/submit-form", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Form submission successful:", data);
        setToastObj({ type: "success", msg: "Form submitted successfully" });
        // Reset form fields
        setName("");
        setPhone("");
        setGender("");
        setDob("");
        setProfileImage(null);
        setInterests([]);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setToastObj({ type: "error", msg: "Error submitting form" });
      });
  };

  useEffect(() => {
    if (checkLogin()) {
      router.push("/home");
    }
  }, [toastObj]);

  return (
    <LandingLayout showButton={false} footerClass={footerClass}>
      <div className="bg-[#04080f] flex items-center justify-center pt-20 sm:pt-40  pb-10 sm:pb-20 min-h-[550px]  2xl:h-[calc(100%-121px)] ">
        <div className="container mx-auto self-center px-6 md:px-8 flex justify-center items-center">
          <form
            className="bg-gray-900 sm:w-7/12 px-12 py-6 rounded-2xl"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-semibold text-white pb-6 border-gray-700 text-left border-b  mb-5">
              Basic Details
            </h2>
            <div className="-mx-3 flex flex-wrap gap-y-5">
              <div className="w-full px-3 sm:w-1/2">
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
              <div className="w-full px-3 sm:w-1/2">
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
              </div>

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
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
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

              <div className="w-full px-3">
                <label
                  htmlFor="profileImage"
                  className="mb-3 block text-base font-medium text-white/80"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  id="profileImage"
                  onChange={handleProfileImageChange}
                  accept="image/*"
                  className="w-full rounded-md border border-gray-600 bg-transparent py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div className="w-full px-3">
                <label className="mb-3 block text-base font-medium text-white/80">
                  Interests
                </label>
                <div className="flex gap-x-5">
                  <label className="text-white inline-flex gap-x-2 items-center">
                    <input
                      type="checkbox"
                      value="Reading"
                      onChange={handleInterestChange}
                      checked={interests.includes("Reading")}
                    />
                    Reading
                  </label>
                  <label className="text-white inline-flex gap-x-2 items-center">
                    <input
                      type="checkbox"
                      value="Sports"
                      onChange={handleInterestChange}
                      checked={interests.includes("Sports")}
                    />
                    Sports
                  </label>
                  <label className="text-white inline-flex gap-x-2 items-center">
                    <input
                      type="checkbox"
                      value="Music"
                      onChange={handleInterestChange}
                      checked={interests.includes("Music")}
                    />
                    Music
                  </label>
                </div>
              </div>
              <div className="w-full px-3 my-5">
                <button
                  type="submit"
                  className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-2 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Submit Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toastObj.msg && (
        <div
          className={`fixed bottom-4 left-4 py-2 px-4 rounded-md text-white ${
            toastObj.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toastObj.msg}
        </div>
      )}
    </LandingLayout>
  );
};

export default UserForm;
