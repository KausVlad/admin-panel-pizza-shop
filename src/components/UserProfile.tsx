import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useState } from "react";
import { handleInputChangeObjectUseState } from "../utils/handleInputChangeObjectUseState";

export const UserProfile = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [userInfoState, setUserInfoState] = useState({
    ...userInfo,
    newPassword: "",
    oldPassword: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleInputChangeObjectUseState<typeof userInfoState>(e, setUserInfoState);
  };

  return (
    <>
      <fieldset>
        <legend>Permission to edit User Credentials and Password</legend>
        <label htmlFor="oldPassword">enter current password</label>
        <input
          id="oldPassword"
          type="password"
          onChange={handleChange}
          value={userInfoState.oldPassword}
        />
      </fieldset>
      <form>
        <fieldset>
          <legend>User Credentials</legend>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={handleChange}
            value={userInfoState.email}
            disabled={userInfoState.oldPassword.length < 5}
          />
          <label htmlFor="phone">PhoneNumber</label>
          <input
            id="phone"
            type="text"
            onChange={handleChange}
            value={userInfoState.phone}
            disabled={userInfoState.oldPassword.length < 6}
          />
        </fieldset>
      </form>
      <form>
        <fieldset>
          <legend>New Password</legend>
          <label htmlFor="newPassword">Password</label>
          <input
            id="newPassword"
            type="password"
            onChange={handleChange}
            value={userInfoState.newPassword}
            disabled={userInfoState.oldPassword.length < 6}
          />
        </fieldset>
      </form>
    </>
  );
};
