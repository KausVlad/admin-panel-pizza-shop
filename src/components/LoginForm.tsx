import { useState } from "react";
import { useLoginMutation } from "../store/pizzaShopApi/auth.endpoints";
import { useDispatch } from "react-redux";
import {
  setAuth,
  setUserAccessToken,
  setUserInfo,
} from "../store/auth/auth.slice";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { parseLoginData } from "../utils/parseLoginData";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    emailOrPhone: "",
    password: "",
  });

  // const { token } = useSelector((state: RootState) => state.auth);
  const { handleLogout } = useLogout();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const accessToken = await login({
        email: credentials.emailOrPhone,
        phone: credentials.emailOrPhone,
        password: credentials.password,
      }).unwrap();
      const { localAuth, userInfo } = parseLoginData(accessToken);

      console.log(accessToken, localAuth, userInfo);
      dispatch(setUserAccessToken(accessToken));
      userInfo && dispatch(setUserInfo({ userInfo }));
      dispatch(setAuth({ isAuth: localAuth }));

      navigate("/");
    } catch (error) {
      console.error(error, "error");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Email or phone
          <input
            required
            type="text"
            name="emailOrPhone"
            value={credentials.emailOrPhone}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            required
            type="password"
            name="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
