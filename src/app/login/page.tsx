"use client";
import LandingLayout from "../layout/LandingLayout";
import React, { useState, useEffect } from "react";
import ComonToast from "../components/ComonToast";
import LoadingComp from "../components/LoadingComp";
import { useRouter } from "next/navigation";
import { checkLogin, initiateGoogleLogin } from "../services/apiUtils";
import { useVideoContext } from "../services/VideoContext";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const footerClass = "!relative";
  const router = useRouter();
  const { setOtherData, otherData } = useVideoContext();

  const [username, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({ username: "", password: "" });
  const [toastObj, setToastObj] = useState({ type: "", msg: "" });
  const handleRequestDemo = () => {
    setOtherData({ ...otherData, requestDemoShow: true });
  };
  const validateForm = () => {
    let valid = true;
    const errors = { username: "", password: "" };

    // Username validation
    if (!username) {
      errors.username = "Username is required";
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
    if (validateForm()) {
      const apiUrl = process.env.NEXT_PUBLIC_API_HOST + "/token";
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);
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
          const result = await response.json();
          localStorage.setItem("athlabsAuthToken", result.access_token);
          router.push("/home");
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

  const initiateGoogleLogin_old = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_HOST + "/login/google";
    window.location.href = apiUrl;
    /* try {
      const response = await fetch(apiUrl); // Make a request to your API endpoint for Google OAuth
      const { authorizationUrl } = await response.json();
      window.location.href = authorizationUrl; // Redirect to Google's authentication page
    } catch (error) {
      console.error("Error initiating Google login:", error);
      toastObj.type = "e";
      toastObj.msg = "Error initiating Google login";
      setToastObj(toastObj);
    } */
  };

  useEffect(() => {
    if (!checkLogin()) {
      router.push("/login");
    } else {
      router.push("/home");
    }
  }, [toastObj]);

  return (
    <LandingLayout showButton={false} footerClass={footerClass}>
      <div className="bg-[#04080f] flex items-center justify-center pt-40 pb-20 min-h-[550px] h-[calc(100%-100px)]  2xl:h-[calc(100%-121px)] ">
        <div className="container mx-auto self-center px-6 md:px-8 flex justify-center items-center">
          <div className="bg-black p-8 rounded-lg shadow-lg max-w-sm w-full border-[3px]  border-gray-400">
            <h2 className="text-2xl font-semibold text-center mb-4 text-white">
              Login
            </h2>
            <p className="text-white/90 text-center mb-10">
              Login to use Athlabs
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
                  Username *
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  className="form-input w-full px-4 py-2 border rounded-lg  border-gray-400 text-white/90  bg-transparent"
                  placeholder="john@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {formErrors.username && (
                  <span>
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.username}
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
                Login
              </button>

              {loading && (
                <div className="mt-3">
                  <LoadingComp />
                </div>
              )}
              <p className="text-white/70 text-xs text-center mt-4">
                Don&apos;t have an account?
                <Link
                  href="/signup"
                  // onClick={handleRequestDemo}

                  className="text-blue-500 hover:underline ml-1 cursor-pointer"
                >
                  Create an account .
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

            <div className=" grid grid-cols-[1fr_45px_1fr] items-center px-5 pt-5">
              <div className=" h-[1px] bg-white/80"></div>
              <div className=" text-white text-center text-sm">Or</div>
              <div className=" h-[1px] bg-white/80"></div>
            </div>

            <div className="flex items-center justify-center  mt-7">
              <a
                onClick={initiateGoogleLogin}
                target="_blank"
                className="px-4 py-1.5 border flex gap-2  bg-white border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
              >
                <Image
                  src={"/images/google-color.svg"}
                  width={24}
                  height={24}
                  alt="logo"
                />
                <span>Login with Google</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default Login;
