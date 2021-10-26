import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getToken } from "../../state/action-creators/loginCreators";
import { RootState } from '../../state/reducers/index';
import Throbber from '../../components/Throbber';

const LoginPage: React.FC = (): JSX.Element => {
  const history = useHistory();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const dispatch = useDispatch();
  const { isLoading, loginData} = useSelector((state: RootState) => state.login);
  const { error } = useSelector((state: RootState) => state.posts);
  const tokenErrorElem: HTMLElement | null = document.querySelector('.error-token');
  const nameErrorElem: HTMLElement | null = document.querySelector('.error-name');
  const emailErrorElem: HTMLElement | null = document.querySelector('.error-email');
  const handleLogin: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!name) {
      nameErrorElem?.classList.remove('hide');
    }

    if (!email) {
      emailErrorElem?.classList.remove('hide');
    }

    if (name && email) {
      dispatch(getToken(name, email));
    }
  };

  tokenErrorElem && tokenErrorElem.classList.add('hide');
  nameErrorElem && nameErrorElem.classList.add('hide');
  emailErrorElem && emailErrorElem.classList.add('hide');

  useEffect(() => {
    if (!error && loginData && loginData.sl_token) {
      localStorage.setItem('token', loginData.sl_token);

      history.push('/posts');
    }

    if (error) {
      tokenErrorElem?.classList.remove('hide');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData, error]);

  return (
    isLoading ? <Throbber /> :
    <div className="center-container login-form">
      <h3>LOGIN</h3>
      <span className="error error-token hide">Token has been expired, please log in again.</span>
      <form onSubmit={handleLogin}>
        <label htmlFor="name">
          Name:
        </label>
        <br/>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}/>
        <span className="error error-name hide">Name is empty or wrong</span>
        <br/>
        <label htmlFor="email">
          Email:
        </label>
        <br/>
        <input
          type="text"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}/>
        <span className="error error-email hide">Email is empty or wrong</span>
        <br/>
        <br/>
        <input type="submit" value="GO"></input>
      </form>
    </div>
  );
}

export default LoginPage;