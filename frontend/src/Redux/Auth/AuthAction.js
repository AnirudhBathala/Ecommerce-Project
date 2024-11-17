import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
  GET_ALL_CUSTOMERS_REQUEST,
  GET_ALL_CUSTOMERS_SUCCESS,
  GET_ALL_CUSTOMERS_FAILURE
} from './ActionTypes';

import api from '../../Config/axiosApi';
import { API_BASE_URL } from '../../Config/axiosApi';

// const RegisterRequest = () => {type:REGISTER_REQUEST,payload}
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload:user });
const registerFailure = error => ({ type: REGISTER_FAILURE, payload: error });


// Asynchronous Action Creators (Thunks): Functions that return another function (like  register function). This inner function can perform asynchronous operations and then dispatch actions based on the results.
export const register = userData => async dispatch => {
    dispatch(registerRequest());
    try {
      const response=await axios.post(`${API_BASE_URL}/auth/signup`, userData);
      const user = response.data;
      if(user.jwt) localStorage.setItem("jwt",user.jwt)
      console.log("registerr :- ",user)
      dispatch(registerSuccess(user));
    } catch (error) {
      console.log("error ",error)
      dispatch(registerFailure(error.message));
    }
  };


  const loginRequest = () => ({ type: LOGIN_REQUEST });
  const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload:user });
  const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error });

  export const login = userData => async (dispatch) => {
    dispatch(loginRequest())
    try{
        console.log("Inside login Action")
        
        const response = await axios.post(`${API_BASE_URL}/auth/login` , userData);
        console.log("response " + response)

        const user = response.data;
        console.log("printing user " + user)
        if(user.jwt) localStorage.setItem("jwt",user.jwt)
        console.log("login : - ", user);
        dispatch(loginSuccess())
    }
    catch (error){
        console.log("error occured ",error)
        dispatch(loginFailure(error.message));
    }
  };

  export const getUser = (token) => {
    return async (dispatch) => {
      dispatch({ type: GET_USER_REQUEST });
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`,{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        });
        const user = response.data;
        dispatch({ type: GET_USER_SUCCESS, payload: user });
        console.log("req User ",user)
      } catch (error) {
        const errorMessage = error.message;
        dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
      }
    };
  };


  export const logout = (token) => {
    return async (dispatch) => {
      dispatch({ type: LOGOUT });
      localStorage.clear();
    };
  };