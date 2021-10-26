import { combineReducers } from "redux";
import { createSelector } from "reselect";
import { Post, UserPosts } from "../types/postsTypes";
import loginReducer from './loginReducer';
import postsReducer from './postsReducer';

export const rootReducer = combineReducers({
  login: loginReducer,
  posts: postsReducer
});

export const selectPostsData = (state: RootState) => state.posts.postsData;

export const selectNormalizedPostsData = createSelector(
  selectPostsData, (postsData) => {
    const posts: Post[] | null = postsData && postsData.posts
    let transformedData: UserPosts[] = [];

    if (posts && posts.length) {
      posts.forEach((post) => {
        const index: number = transformedData.findIndex(p => p.from_id === post.from_id);
        // not a proper solution, could be done much easier with Moment.js or another approach
        const date: Date = new Date(post.created_time);
        const year: number = date.getFullYear();
        const month: string = date.toLocaleString('en-US', { month: 'long' });
        const day: number = date.getDate();
        const hours: number = date.getHours()
        const minutes: number = date.getMinutes();
        const seconds: number = date.getSeconds();
        const created_time: string = month + ' ' + (day < 10 ? '0' + day : day) +
          ', ' + year + ' ' + (hours < 10 ? '0' + hours : hours) + ':' +
          (minutes < 10 ? '0' + minutes : minutes) + ':' + seconds;

        if (index !== -1) {
          transformedData[index].posts.push({
            id: post.id,
            message: post.message,
            created_time: created_time,
            created_time_milliseconds: date.getTime()
          })
        } else {
          transformedData.push({
            from_name: post.from_name,
            from_id: post.from_id,
            posts: [{
              id: post.id,
              message: post.message,
              created_time: created_time,
              created_time_milliseconds: date.getTime()
            }]
          })
        }
      });
    }

    return transformedData;
  }
);

export type RootState = ReturnType<typeof rootReducer>;