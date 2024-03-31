import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useState } from "react";
import { handleInputChangeObjectUseState } from "../utils/handleInputChangeObjectUseState";
import {
  useChangePasswordMutation,
  useGetUserInfoMutation,
  useUpdateUserCredentialsMutation,
  useUpdateUserInfoMutation,
  useUpdateUserPhotoMutation,
} from "../store/pizzaShopApi/auth.endpoints";
import { setUserInfo } from "../store/auth/auth.slice";

export const UserProfile = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [updateUserCredentials] = useUpdateUserCredentialsMutation();
  const [changePassword] = useChangePasswordMutation();
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [getUserInfo] = useGetUserInfoMutation();
  const [updateUserPhoto] = useUpdateUserPhotoMutation();

  const dispatch = useDispatch();

  const [userInfoState, setUserInfoState] = useState({
    ...userInfo,
    newPassword: "",
    oldPassword: "",
  });
  const [userPhoto, setUserPhoto] = useState(null as File | null);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleInputChangeObjectUseState<typeof userInfoState>(e, setUserInfoState);
  };

  const updateStateData = async () => {
    const userInfo = await getUserInfo().unwrap();

    dispatch(setUserInfo({ userInfo }));
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
          updateStateData();
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
          updateStateData();
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUserInfo({
            userName:
              userInfoState.userName !== userInfo.userName
                ? userInfoState.userName
                : undefined,
            address:
              userInfoState.address !== userInfo.address
                ? userInfoState.address
                : undefined,
            birthDate:
              userInfoState.birthDate !== userInfo.birthDate
                ? userInfoState.birthDate
                : undefined,
            sex:
              userInfoState.sex !== userInfo.sex
                ? userInfoState.sex
                : undefined,
          });
          updateStateData();
        }}
      >
        <fieldset>
          <legend>User Info</legend>
          <label htmlFor="userName">UserName</label>
          <input
            id="userName"
            type="text"
            onChange={handleChange}
            value={userInfoState.userName}
          />
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            onChange={handleChange}
            value={userInfoState.address}
          />
          <label htmlFor="birthDate">BirthDate</label>
          <input
            id="birthDate"
            type="date"
            onChange={handleChange}
            value={
              userInfoState.birthDate
                ? userInfoState.birthDate.split("T")[0]
                : ""
            }
          />
          <label htmlFor="sex">Sex</label>
          <select id="sex" onChange={handleChange} value={userInfoState.sex}>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
            <option value="OTHER">OTHER</option>
          </select>
          <button type="submit">Update</button>
        </fieldset>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUserPhoto({
            userPhoto,
          });
          setTimeout(() => {
            updateStateData();
          }, 5000);
        }}
      >
        <fieldset>
          <legend>Update User Photo</legend>
          <label htmlFor="userPhoto">User Photo</label>
          <input
            id="userPhoto"
            type="file"
            onChange={(e) => setUserPhoto(e.target.files?.[0] || null)}
          />
          <button type="submit">Update</button>
        </fieldset>
      </form>
    </>
  );
};
