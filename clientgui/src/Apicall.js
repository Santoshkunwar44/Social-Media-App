import axiosCall from "./axios";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await axiosCall.post("/auth/login", userCredentials);
    response.data &&
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.others });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });  
  }
};
