const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;

const callApi = async (method, contentType, bodyData,uriString) => {
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
      body: bodyData,
    };

    const response = await fetch(BASE_URL+uriString, requestOptions);
    console.log('response',response.status)
    if(response.status === 401){
      localStorage.removeItem("athlabsAuthToken");
      window.location.href = '/login'
    }
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
  }else{
    return token;
  }
}

export { callApi,checkLogin };
