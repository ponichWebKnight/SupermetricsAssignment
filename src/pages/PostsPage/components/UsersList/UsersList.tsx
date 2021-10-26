import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useQuery } from "../../../../hooks/useQuery";
import { RootState } from "../../../../state/reducers";
import { selectNormalizedPostsData } from '../../../../state/reducers'
import { UserPosts } from "../../../../state/types/postsTypes";

const UsersList: React.FC = (): JSX.Element => {
  const [searchString, setSearchString] = useState('');
  const state = useSelector((state: RootState) => state)
  const history = useHistory();
  const queryParams: URLSearchParams = useQuery();
  const userId = queryParams.get('userId');
  let users: UserPosts[] = selectNormalizedPostsData(state);
  let currentUsers: UserPosts[] = users;

  const handleUserClick = (e: React.MouseEvent<HTMLLIElement>): void => {
    const selectedUserId: string | null = e.currentTarget.dataset.userId || null;

    if (selectedUserId) {
      history.push('/posts?userId=' + selectedUserId);
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
              onClick={handleUserClick}
              className={(userId && userId === user.from_id) ? 'active' : ''}>
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
