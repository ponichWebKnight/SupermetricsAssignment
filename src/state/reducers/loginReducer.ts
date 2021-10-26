import { LoginState, LoginAction, LoginActionsTypes } from '../types/loginTypes'

const initialState = {
  loginData: null,
  isLoading: false,
  error: null
}

const loginReducer = (state: LoginState = initialState, action: LoginAction): LoginState => {
  switch (action.type) {
    case LoginActionsTypes.GET_TOKEN:
      return {
        ...state,
        loginData: null,
        error: null,
        isLoading: true
      };
    case LoginActionsTypes.GET_TOKEN_SUCCESS:
      return {
        ...state,
        loginData: action.payload,
        error: null,
        isLoading: false
      };
    case LoginActionsTypes.GET_TOKEN_ERROR:
      return {
        ...state,
        loginData: null,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}

export default loginReducer;