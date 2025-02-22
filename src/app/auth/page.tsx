"use client";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const AuthComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;
  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        // Get query parameters from the URL
        const code = searchParams.get('code');
        if (!code) {
          throw new Error("No code in query parameters");
        }
        console.log("code", code);
        const queryParams = { code };

        // Construct the API URL with query parameters
        const authApiUrl = `${BASE_URL}/auth?${new URLSearchParams(
          queryParams
        ).toString()}`;

        // Send a request to the authentication API
        const response = await fetch(authApiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        if (!response.ok) {
          throw new Error("Authentication failed");
        }

        // Get the response data (assuming it contains a token)
        const result = await response.json();

        // Store the token in localStorage
        localStorage.setItem("athlabsAuthToken", result.access_token);

        // Navigate to the home page
        router.push("/home");
      } catch (error) {
        console.error("Error during authentication:", error);
        // Handle error, e.g., display an error message
      }
    };

    handleAuthentication();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-#171717">
      <div className="flex items-center justify-center bg-gray-500 rounded-lg p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        <p className="text-white ml-2">Authenticating...</p>
      </div>
    </div>
  );
};

export default AuthComponent;
