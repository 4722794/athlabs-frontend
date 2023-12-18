//const BASE_URL = 'http://api.athlabs.co/'; // Replace with your API base URL
const BASE_URL = 'http://localhost:3000/';

const callApi = async (method, contentType = 'application/json', bodyData = null,uriString) => {
  const token = localStorage.getItem('athlabsAuthToken'); 
  if (!token) {
    // Handle token not available (e.g., redirect to login)
    return { error: 'Token not found' };
  }

  try {
    const headers = {
      'Content-Type': contentType,
      Authorization: `Bearer ${token}`,
    };

    const requestOptions = {
      method: method,
      headers: headers,
      body: bodyData ? JSON.stringify(bodyData) : null,
    };

    const response = await fetch(BASE_URL+uriString, requestOptions);
    console.log('response',response.status)
    const data = await response.json();
    const status = response.status; // Get HTTP status
    return { data, status }; // Return both data and status
  } catch (error) {
    return { error: 'Something went wrong' };
  }
};

const checkLogin = ()=>{
  const token = localStorage.getItem('athlabsAuthToken'); 
  if (!token) {
    return false
  }
}

export { callApi,checkLogin };
