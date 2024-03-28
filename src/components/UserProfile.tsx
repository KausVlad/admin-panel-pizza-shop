import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useState } from "react";
import { handleInputChangeObjectUseState } from "../utils/handleInputChangeObjectUseState";
import {
  useChangePasswordMutation,
  useUpdateUserCredentialsMutation,
} from "../store/pizzaShopApi/auth.endpoints";

export const UserProfile = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [updateUserCredentials] = useUpdateUserCredentialsMutation();
  const [changePassword] = useChangePasswordMutation();

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUserCredentials({
            email:
              userInfoState.email !== userInfo.email
                ? userInfoState.email
                : undefined,
            phone:
              userInfoState.phone !== userInfo.phone
                ? userInfoState.phone
                : undefined,
            oldPassword: userInfoState.oldPassword,
          });
        }}
      >
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
            type="phone"
            onChange={handleChange}
            value={userInfoState.phone}
            disabled={userInfoState.oldPassword.length < 6}
          />
          <button type="submit">Update</button>
        </fieldset>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          changePassword({
            oldPassword: userInfoState.oldPassword,
            newPassword: userInfoState.newPassword,
          });
        }}
      >
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
