import axios from "axios"
import { Dispatch } from "redux"
import { PostsAction, PostsActionsTypes, PostsResponse } from "../types/postsTypes"

const { REACT_APP_API_BASE_URL } = process.env;

export const getPosts = (token: string, pageIndex: number) => {
  return async (dispatch: Dispatch<PostsAction>) => {
    try {
      dispatch({type: PostsActionsTypes.GET_POSTS_DATA})
      const data = {
        sl_token: token,
        pageIndex: pageIndex
      };
      const response = await axios.get<PostsResponse>(
        REACT_APP_API_BASE_URL + 'posts',
        {params: data}
      );
      dispatch({
        type: PostsActionsTypes.GET_POSTS_DATA_SUCCESS,
        payload: response.data.data
      });
    } catch (e) {
      dispatch({
        type: PostsActionsTypes.GET_POSTS_DATA_ERROR,
        payload: 'There is an error with registration, please try again later.'
      })
    }
  }
}

export const setSelectedUser = (user_id: string) => {
  return (dispatch: Dispatch<PostsAction>) => {
    dispatch({
      type: PostsActionsTypes.SET_SELECTED_USER,
      payload: user_id
    })
  };
}
