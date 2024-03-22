"use client";
import LandingLayout from "../layout/LandingLayout";
import React, { useState, useEffect } from "react";
import ComonToast from "../components/ComonToast";
import LoadingComp from "../components/LoadingComp";
import { useRouter } from "next/navigation";
import { checkLogin } from "../services/apiUtils";
import { useVideoContext } from "../services/VideoContext";
import Image from "next/image";

const Login = () => {
  const footerClass = "!relative";
  const router = useRouter();
  const { setOtherData, otherData } = useVideoContext();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [toastObj, setToastObj] = useState({ type: "", msg: "" });

  const handleRequestDemo = () => {
    setOtherData({ ...otherData, requestDemoShow: true });
  };
  const validateForm = () => {
    let valid = true;
    const errors = { email: "", password: "" };

    // Username validation
    if (!email) {
      errors.email = "Email is required";
      valid = false;
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required";
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

    const apiUrl = process.env.NEXT_PUBLIC_API_HOST + "/u/create";
    if (validateForm()) {
      setLoading(true);
      try {
        // Create form data object

        let urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", password);

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: urlencoded,
        });

        if (response.status === 200) {
          const apiUrlToke = process.env.NEXT_PUBLIC_API_HOST + "/token";
          const formData = new URLSearchParams();
          formData.append("username", email);
          formData.append("password", password);
          setLoading(true);

          try {
            const response = await fetch(apiUrlToke, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: formData,
              redirect: "follow",
            });

            // Handling response based on status
            if (response.status === 200 && response.ok) {
              const result = await response.json();
              localStorage.setItem("athlabsAuthToken", result.access_token);
              setTimeout(() => {
                router.push("/basicDetails");
              }, 1);
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
          }
        } else {
          let result1 = await response.text();
          const errorMessage = JSON.parse(result1).detail;
          toastObj.type = "e";
          toastObj.msg = errorMessage || "Error submitting form";
          setToastObj(toastObj);
        }

        // Handle successful signup
        console.log("Signup successful");
      } catch (error) {
      } finally {
        setLoading(false);
      }
    } else {
      //validation failed
    }
  };

  useEffect(() => {
    if (checkLogin()) {
      router.push("/home");
    }
  }, [toastObj]);

  return (
    <LandingLayout showButton={false} footerClass={footerClass}>
      <div className="bg-[#04080f] flex items-center justify-center pt-40 pb-20 min-h-[550px] h-[calc(100%-100px)]  2xl:h-[calc(100%-121px)] ">
        <div className="container mx-auto self-center px-6 md:px-8 flex justify-center items-center">
          <div className="bg-black p-8 rounded-lg shadow-lg max-w-sm w-full border-[3px]  border-gray-400">
            <h2 className="text-2xl font-semibold text-center mb-4 text-white">
              Sign Up
            </h2>
            <p className="text-white/90 text-center mb-10">
              Sign Up to use Athlabs
            </p>

            {toastObj.type && (
              <ComonToast toastObj={toastObj} setToastObj={setToastObj} />
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-white/70  text-sm font-semibold mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="text"
                  id="username"
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
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-white/70  text-sm font-semibold mb-2"
                >
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  className="form-input w-full px-4 py-2 border rounded-lg  border-gray-400 text-white/90  bg-transparent"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {formErrors.password && (
                  <span>
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.password}
                    </p>
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign Up
              </button>

              {loading && (
                <div className="mt-3">
                  <LoadingComp />
                </div>
              )}
            </form>

            <div className=" grid grid-cols-[1fr_45px_1fr] items-center px-5 pt-5">
              <div className=" h-[1px] bg-white/80"></div>
              <div className=" text-white text-center text-sm">Or</div>
              <div className=" h-[1px] bg-white/80"></div>
            </div>

            <div className="flex items-center justify-center  mt-7">
              <button className="px-4 py-1.5 border flex gap-2  bg-white border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                <Image
                  src={"/images/google-color.svg"}
                  width={24}
                  height={24}
                  alt="logo"
                />
                <span>Signup with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default Login;
