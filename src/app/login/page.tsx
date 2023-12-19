"use client";
import LandingLayout from "../layout/LandingLayout";
import React, { useState, useEffect } from "react";
import ComonToast from "../components/ComonToast";
import LoadingComp from "../components/LoadingComp";
import { useRouter } from "next/navigation";
import { checkLogin } from "../services/apiUtils";

const Login = () => {
  const footerClass = "!relative";
  const router = useRouter();

  const [username, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({ username: "", password: "" });
  const [toastObj, setToastObj] = useState({ type: "", msg: "" });

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

  useEffect(() => {
    if (!checkLogin()) {
      router.push("/login");
    } else {
      router.push("/home");
    }
  }, [toastObj]);

  return (
    <LandingLayout showButton={false} footerClass={footerClass}>
      <div className="bg-[#04080f] flex items-center justify-center pt-40 pb-20">
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
                placeholder="hello@alignui.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              {formErrors.username && (
                <span>
                  <p className="text-white/70 text-xs mt-1">
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
                  <p className="text-white/70 text-xs mt-1">
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
              <a className="text-blue-500 hover:underline ml-1" target="_blank">
                Request for access
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </LandingLayout>
  );
};

export default Login;
