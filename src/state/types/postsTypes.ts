// Using enum to set multiple action types
export enum PostsActionsTypes {
  GET_POSTS_DATA = "GET_POSTS_DATA",
  GET_POSTS_DATA_SUCCESS = "GET_POSTS_DATA_SUCCESS",
  GET_POSTS_DATA_ERROR = "GET_POSTS_DATA_ERROR",
  SET_SELECTED_USER = "SET_SELECTED_USER"
}

// implementation of types and interfaces for loginReducer
interface GetPostsDataAction {
  type: PostsActionsTypes.GET_POSTS_DATA;
}

interface GetPostsDataSuccessAction {
  type: PostsActionsTypes.GET_POSTS_DATA_SUCCESS;
  payload: PostsData;
}

interface GetPostsDataErrorAction {
  type: PostsActionsTypes.GET_POSTS_DATA_ERROR;
  payload: string;
}

interface SetSelectedUserAction {
  type: PostsActionsTypes.SET_SELECTED_USER;
  payload: string | null;
}

export type PostsAction = GetPostsDataAction | GetPostsDataSuccessAction | GetPostsDataErrorAction | SetSelectedUserAction;

export type Post = {
  created_time: string,
  from_id: string,
  from_name: string,
  id: string,
  message: string,
  type: string
}

export type PostsData = {
  page: number,
  posts: Post[],
}

export type PostsState = {
  postsData: null | PostsData,
  selectedUser: null | string,
  isLoading: boolean,
  error: null | string
}

export type PostsResponse = {
  data: PostsData,
  meta: {
    request_id: string
  }
}

export type NormalizedPost = {
  id: string,
  message: string,
  created_time: string,
  created_time_milliseconds: number
}

export type UserPosts = {
  from_name: string,
  from_id: string,
  posts: NormalizedPost[]
}