// Using enum to set multiple action types
export enum LoginActionsTypes {
  GET_TOKEN = "GET_TOKEN",
  GET_TOKEN_SUCCESS = "GET_TOKEN_SUCCESS",
  GET_TOKEN_ERROR = "GET_TOKEN_ERROR",
}

// implementation of types and interfaces for loginReducer
interface GetTokenAction {
  type: LoginActionsTypes.GET_TOKEN;
}

interface GetTokenSuccessAction {
  type: LoginActionsTypes.GET_TOKEN_SUCCESS;
  payload: LoginData;
}

interface GetTokenErrorAction {
  type: LoginActionsTypes.GET_TOKEN_ERROR;
  payload: string;
}

export type LoginAction = GetTokenAction | GetTokenSuccessAction | GetTokenErrorAction;

export type LoginData = {
  sl_token: string,
  client_id: string,
  email: string
}

export type LoginResponse = {
  data: LoginData,
  meta: {
    request_id: string
  }
}

export type LoginState = {
  loginData: LoginData | null,
  isLoading: boolean,
  error: null | string
}