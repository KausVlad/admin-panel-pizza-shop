import { useState } from "react";
import { useLoginMutation } from "../store/pizzaShopApi/auth.endpoints";
import { useDispatch } from "react-redux";
import { setUserAccessToken } from "../store/auth/auth.slice";
import { jwtDecode } from "jwt-decode";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    emailOrPhone: "",
    password: "",
  });

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
      console.log(data, jwtDecode(data.accessToken));
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
