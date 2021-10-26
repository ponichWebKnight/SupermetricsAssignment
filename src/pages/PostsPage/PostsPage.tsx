import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useQuery } from "../../hooks/useQuery";
import { getPosts, setSelectedUser } from "../../state/action-creators/postsCreators";
import { RootState } from '../../state/reducers/index';
import Throbber from '../../components/Throbber';
import UsersList from "./components/UsersList";
import UserPosts from "./components/UserPosts";

const PostsPage: React.FC = (): JSX.Element => {
  const history = useHistory();
  const queryParams: URLSearchParams = useQuery();
  const userId = queryParams.get('userId');
  const dispatch = useDispatch();
  const { isLoading, error} = useSelector((state: RootState) => state.posts);
  const { loginData } = useSelector((state: RootState) => state.login);

  useEffect(() => {
    let token = localStorage.getItem('token');
    token = (loginData && loginData.sl_token) || token;

    if (token) {
      dispatch(getPosts(token, 1));

    } else {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(setSelectedUser(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (error) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return(
    isLoading ? <Throbber /> :
    <div className="dashboard">
      <UsersList />
      <UserPosts />
    </div>
  );
}
  
export default PostsPage;