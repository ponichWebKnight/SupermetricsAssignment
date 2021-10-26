import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from '../../../../state/reducers';
import { selectNormalizedPostsData } from '../../../../state/reducers'
import { UserPosts as Posts, NormalizedPost } from "../../../../state/types/postsTypes";

const UserPosts: React.FC = (): JSX.Element => {
  const [searchString, setSearchString] = useState<string>('');
  const [orderType, setOrderType] = useState<string>('asc');
  const state: RootState = useSelector((state: RootState) => state)
  const userPosts: Posts[] = selectNormalizedPostsData(state);
  let currentPosts: NormalizedPost[] = [];

  if (state.posts.selectedUser) {
    let selectedUserIndex: number = userPosts.findIndex((user) => {
      return user.from_id === state.posts.selectedUser
    });

    if (orderType === 'desc') {
      currentPosts = userPosts[selectedUserIndex].posts.sort((a, b) => {
        return a.created_time_milliseconds - b.created_time_milliseconds;
      })
    } else {
      currentPosts = userPosts[selectedUserIndex].posts.sort((a, b) => {
        return b.created_time_milliseconds - a.created_time_milliseconds;
      })
    }

    if (searchString) {
      currentPosts = userPosts[selectedUserIndex].posts.filter((post) => {
        return post.message.toLowerCase().includes(searchString.toLowerCase()) ? post : null;
      })
    } else {
      currentPosts = userPosts[selectedUserIndex].posts;
    }
  }

  return (
    <section className="posts">
      <div className="posts-filter">
        {(currentPosts && currentPosts.length) ? (
          <div className="posts-order">
            <button className="posts-order__button mr-10" onClick={(e) => setOrderType('asc')}>&#8679;</button>
            <button className="posts-order__button" onClick={(e) => setOrderType('desc')}>&#8681;</button>
          </div>
        ) : null}
        <div className="posts-search">
          <input type="text"
            name="search"
            placeholder="Search"
            value={searchString}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSearchString(e.target.value)} />
        </div>
      </div>
      {(currentPosts && currentPosts.length) ? (
        <div className="user-posts">
          <ul>
            {currentPosts && currentPosts.length && currentPosts.map((currentPost) => 
              <li key={currentPost.id}>
                <div className="post-date">{currentPost.created_time}</div>
                <div className="post-message">{currentPost.message}</div>
              </li>
            )}
          </ul>
        </div>
      ) : null}
    </section>
  )
};

export default UserPosts;