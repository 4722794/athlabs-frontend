"use client";
import LandingLayout from "../layout/LandingLayout";
import React, { useState } from "react";
import ComonToast from "../components/ComonToast";
import LoadingComp from "../components/LoadingComp";
import Link from "next/link";

const ForgotPassword = () => {
  const footerClass = "!relative";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: "" });
  const [toastObj, setToastObj] = useState({ type: "", msg: "" });

  const validateForm = () => {
    let valid = true;
    const errors = { email: "" };

    // Username validation
    if (!email) {
      errors.email = "Email is required";
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      const apiUrl = process.env.NEXT_PUBLIC_API_HOST + "/u/forgot-password";
      const formData = new URLSearchParams();
      formData.append("email", email);

      setLoading(true);

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
          redirect: "follow",
        });

        // Handling response based on status
        if (response.status === 200) {
            const data = await response.json();
            // If the response is OK, we assume the email was sent successfully
            toastObj.type = "s";
            toastObj.msg = data.message || "Password reset link sent to your email";
            setToastObj(toastObj);
            setEmail("");
        } else {
          let result1 = await response.text();
          const errorMessage = JSON.parse(result1).detail;
          toastObj.type = "e";
          toastObj.msg = errorMessage || "Error submitting form";
          setToastObj(toastObj);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toastObj.type = "e";
        toastObj.msg = "Error submitting form";
        setToastObj(toastObj);
      } finally {
        setLoading(false);
      }
    } else {
      //validation failed
    }
  };

  return (
    <LandingLayout showButton={false} footerClass={footerClass}>
      <div className="bg-[#04080f] flex items-center justify-center pt-40 pb-20 min-h-[550px] h-[calc(100%-100px)]  2xl:h-[calc(100%-121px)] ">
        <div className="container mx-auto self-center px-6 md:px-8 flex justify-center items-center">
          <div className="bg-black p-8 rounded-lg shadow-lg max-w-sm w-full border-[3px]  border-gray-400">
            <h2 className="text-2xl font-semibold text-center mb-4 text-white">
              Forgot Password
            </h2>

            {toastObj.type && (
              <ComonToast toastObj={toastObj} setToastObj={setToastObj} />
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-white/70  text-sm font-semibold mb-2"
                >
                  Email *
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  className="form-input w-full px-4 py-2 border rounded-lg  border-gray-400 text-white/90  bg-transparent"
                  placeholder="john@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {formErrors.email && (
                  <span>
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.email}
                    </p>
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Forgot Password
              </button>

              {loading && (
                <div className="mt-3">
                  <LoadingComp />
                </div>
              )}
              <p className="text-white/70 text-xs text-center mt-4">
                Already have an account?
                <Link
                  href="/login"
                  className="text-blue-500 hover:underline ml-1 cursor-pointer"
                >
                  Login
                </Link>
              </p>
              {/*  <p className="text-white/70 text-xs text-center mt-4">
                Forgot Password?
                <a
                  onClick={handleRequestDemo}
                  className="text-blue-500 hover:underline ml-1 cursor-pointer"
                >
                  Recover your password here
                </a>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default ForgotPassword;
