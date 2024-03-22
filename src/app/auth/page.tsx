"use client";
import React, { useEffect } from "react";
import { useSearchParams, ro, useRouter } from "next/navigation";

const AuthComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;
  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        // Get query parameters from the URL
        const queryParams = searchParams.toString();
        console.log("query", queryParams);

        // Construct the API URL with query parameters
        const authApiUrl = `${BASE_URL}/auth?${new URLSearchParams(
          queryParams
        ).toString()}`;

        // Send a request to the authentication API
        const response = await fetch(authApiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Authentication failed");
        }

        // Get the response data (assuming it contains a token)
        const data = await response.json();
        const { token } = data;

        // Store the token in localStorage
        localStorage.setItem("token", token);

        // Navigate to the home page
        router.push("/home");
      } catch (error) {
        console.error("Error during authentication:", error);
        // Handle error, e.g., display an error message
      }
    };

    handleAuthentication();
  }, []);

  return <div>Authenticating...</div>;
};

export default AuthComponent;
