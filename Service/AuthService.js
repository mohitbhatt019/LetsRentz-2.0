import axios from 'axios';


export const login = async (username, password) => {
  try {

    // If the response is successful (status 200), return the token and roles
    if (username == "bhatt" && password == "bhatt") {

  return true;
}else{

  return false;
}
    
  } catch (error) {
    console.error('Login API call error:', error.message);
    throw error; // Throw error to handle it in the LoginScreen
  }
};
