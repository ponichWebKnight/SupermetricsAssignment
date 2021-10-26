import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../../../state/action-creators/postsCreators";
import { RootState } from "../../../../state/reducers";
import { selectNormalizedPostsData } from '../../../../state/reducers'
import { UserPosts } from "../../../../state/types/postsTypes";

const UsersList: React.FC = (): JSX.Element => {
  const [searchString, setSearchString] = useState('');
  const state = useSelector((state: RootState) => state)
  let users: UserPosts[] = selectNormalizedPostsData(state);
  let currentUsers: UserPosts[] = users;
  const dispatch = useDispatch();

  const handleUserClick = (e: React.MouseEvent<HTMLLIElement>): void => {
    const selectedUserId: string | null = e.currentTarget.dataset.userId || null;

    if (selectedUserId) {
      dispatch(setSelectedUser(selectedUserId));
    }
  };

  if (searchString) {
    currentUsers = users.filter((user) => {
      return user.from_name.toLowerCase().includes(searchString.toLowerCase()) ? user : null;
    });
  }

  return (
    <div className="users">
      <div className="users-search">
        <input type="text"
          name="search"
          placeholder="Search"
          value={searchString}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSearchString(e.target.value)} />
      </div>
      <div className="users-list">
        <ul>
          {currentUsers && currentUsers.map((user) => 
            <li key={user.from_id}
              data-user-id={user.from_id}
              onClick={handleUserClick}>
              <span>{user.from_name}</span>
              <span className="post-counter">{user.posts.length}</span>
            </li>
          )
          }
        </ul>
      </div>
    </div>
  );
};

export default UsersList;
