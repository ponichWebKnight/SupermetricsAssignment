import axios from "axios"
import { Dispatch } from "redux"
import { LoginAction, LoginActionsTypes, LoginResponse } from "../types/loginTypes"

const { REACT_APP_API_BASE_URL, REACT_APP_API_CLIENT_ID } = process.env;

export const getToken = (name: string, email: string) => {
  return async (dispatch: Dispatch<LoginAction>) => {
    try {
      dispatch({type: LoginActionsTypes.GET_TOKEN})
      const data = {
        client_id: REACT_APP_API_CLIENT_ID,
        name: name,
        email: email
      };
      const response = await axios.post<LoginResponse>(
        REACT_APP_API_BASE_URL + 'register',
        data
      );
      dispatch({
        type: LoginActionsTypes.GET_TOKEN_SUCCESS,
        payload: response.data.data
      });
    } catch (e) {
      dispatch({
        type: LoginActionsTypes.GET_TOKEN_ERROR,
        payload: 'There is an error with registration, please try again later.'
      })
    }
  }
}
