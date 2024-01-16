import { useState } from "react";
import { useLoginMutation } from "../store/pizzaShopApi/auth.endpoints";
import { useDispatch, useSelector } from "react-redux";
import { setUserAccessToken } from "../store/auth/auth.slice";
import { RootState } from "../store/store";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    emailOrPhone: "",
    password: "",
  });

  const { token, email, role, userName } = useSelector(
    (state: RootState) => state.auth
  );
  console.log(token, email, role, userName);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

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
      const data = await login({
        email: credentials.emailOrPhone,
        phone: credentials.emailOrPhone,
        password: credentials.password,
      }).unwrap();
      dispatch(setUserAccessToken({ accessToken: data.accessToken }));
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
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
  );
}
