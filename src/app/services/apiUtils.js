const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;

const callApi = async (method, contentType, bodyData, uriString) => {
  const token = localStorage.getItem("athlabsAuthToken");
  if (!token) {
    // Handle token not available (e.g., redirect to login)
    return { error: "Token not found" };
  }
  try {
    const headers = {
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    };

    const requestOptions = {
      method: method,
      headers: headers,
      body: bodyData,
    };

    const response = await fetch(BASE_URL + uriString, requestOptions);
    console.log("response", response.status);
    if (response.status === 401) {
      localStorage.removeItem("athlabsAuthToken");
      localStorage.removeItem("athlabsLoggedInUser");
      window.location.href = "/login";
    }
    const data = await response.json();
    const status = response.status; // Get HTTP status
    return { data, status }; // Return both data and status
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

const checkLogin = () => {
  const token = localStorage.getItem("athlabsAuthToken");
  if (!token) {
    return false;
  } else {
    return token;
  }
};

const FECallApi = async (method, contentType, bodyData, uriString) => {
  try {
    const headers = {
      "Content-Type": contentType,
    };

    const requestOptions = {
      method: method,
      headers: headers,
      body: bodyData,
    };

    const response = await fetch(BASE_URL + uriString, requestOptions);
    console.log("response FECallApi", response.status);
    const data = await response.json();
    const status = response.status; // Get HTTP status
    return { data, status }; // Return both data and status
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

const callApiData = async (method, headersD = {}, bodyData, uriString) => {
  const token = localStorage.getItem("athlabsAuthToken");
  if (!token) {
    // Handle token not available (e.g., redirect to login)
    return { error: "Token not found" };
  }
  try {
    const headers = {
      ...headersD,
      Authorization: `Bearer ${token}`,
    };

    const requestOptions = {
      method: method,
      headers: headers,
      body: bodyData,
    };

    const response = await fetch(BASE_URL + uriString, requestOptions);
    console.log("response", response.status);
    if (response.status === 401) {
      localStorage.removeItem("athlabsAuthToken");
      localStorage.removeItem("athlabsLoggedInUser");
      window.location.href = "/login";
    }
    const data = await response.json();
    const status = response.status; // Get HTTP status
    return { data, status }; // Return both data and status
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

const initiateGoogleLogin = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_HOST + "/login/google";
  window.location.href = apiUrl;
};


export { callApi, checkLogin, FECallApi, callApiData, initiateGoogleLogin };
