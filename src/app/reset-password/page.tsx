"use client";
import LandingLayout from "../layout/LandingLayout";
import React, { useEffect, useState } from "react";
import ComonToast from "../components/ComonToast";
import LoadingComp from "../components/LoadingComp";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const footerClass = "!relative";

  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [toastObj, setToastObj] = useState({ type: "", msg: "" });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      setToken(token);
    } else {
      router.push("/login");
    }
  }, [router]);

  const validateForm = () => {
    let valid = true;
    const errors = { password: "", confirmPassword: "" };

    // Password validation
    if (!password || !/^(?=.*[0-9])[a-zA-Z0-9]{8,}$/.test(password)) {
      errors.password =
        "Password must be at least 8 characters long and include at least one number. Only alphanumeric characters allowed.";
      valid = false;
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      const apiUrl = process.env.NEXT_PUBLIC_API_HOST + "/u/reset-password";
      const formData = new URLSearchParams();
      formData.append("password", password);
      formData.append("token", token);

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
          // If the response is OK, we assume the password was reset successfully
          toastObj.type = "s";
          toastObj.msg = "Password has been reset successfully";
          setToastObj(toastObj);
          setPassword("");
          setConfirmPassword("");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
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
    }
  };

  return (
    <LandingLayout showButton={false} footerClass={footerClass}>
      <div className="bg-[#04080f] flex items-center justify-center pt-40 pb-20 min-h-[550px] h-[calc(100%-100px)]  2xl:h-[calc(100%-121px)] ">
        <div className="container mx-auto self-center px-6 md:px-8 flex justify-center items-center">
          <div className="bg-black p-8 rounded-lg shadow-lg max-w-sm w-full border-[3px]  border-gray-400">
            <h2 className="text-2xl font-semibold text-center mb-4 text-white">
              Reset Password
            </h2>

            {toastObj.type && (
              <ComonToast toastObj={toastObj} setToastObj={setToastObj} />
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-white/70  text-sm font-semibold mb-2"
                >
                  New Password *
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  className="form-input w-full px-4 py-2 border rounded-lg  border-gray-400 text-white/90  bg-transparent"
                  placeholder="john@gmail.com"
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
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-white/70  text-sm font-semibold mb-2"
                >
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  className="form-input w-full px-4 py-2 border rounded-lg  border-gray-400 text-white/90  bg-transparent"
                  placeholder="john@gmail.com"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {formErrors.confirmPassword && (
                  <span>
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.confirmPassword}
                    </p>
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Reset Password
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

export default ResetPassword;
