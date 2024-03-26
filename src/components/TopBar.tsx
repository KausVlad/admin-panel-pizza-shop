import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, lazyload } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

export const TopBar = () => {
  const { handleLogout } = useLogout();

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const cld = new Cloudinary({ cloud: { cloudName: "dqzkbox6z" } });

  const userImage = cld.image(userInfo?.userPhoto);
  userImage.resize(fill().width(50));

  return (
    <div className="flex">
      <NavLink to="/pizza" className="flex">
        <AdvancedImage
          cldImg={userImage}
          plugins={[lazyload()]}
          alt="My Image"
        />
        <h3>{userInfo?.userName}</h3>
      </NavLink>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
