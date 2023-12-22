import { useState } from "react";
import { authEndpoints } from "../store/pizzaShopApi/auth.endpoints";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = authEndpoints.useLoginQuery({
      email: credentials.emailOrPhone,
      password: credentials.password,
    });
    console.log(data);
  };

  console.log(credentials);
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
