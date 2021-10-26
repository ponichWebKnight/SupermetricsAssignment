import { PostsState, PostsAction, PostsActionsTypes } from '../types/postsTypes'

const initialState = {
  postsData: null,
  selectedUser: null,
  isLoading: true,
  error: null
}

const postsReducer = (state: PostsState = initialState, action: PostsAction): PostsState => {
  switch (action.type) {
    case PostsActionsTypes.GET_POSTS_DATA:
      return {
        ...state,
        postsData: null,
        error: null,
        isLoading: true
      };
    case PostsActionsTypes.GET_POSTS_DATA_SUCCESS:
      return {
        ...state,
        postsData: action.payload,
        error: null,
        isLoading: false
      };
    case PostsActionsTypes.GET_POSTS_DATA_ERROR:
      return {
        ...state,
        postsData: null,
        error: action.payload,
        isLoading: false
      };
    case PostsActionsTypes.SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload
      };
    default:
      return state;
  }
}

export default postsReducer;