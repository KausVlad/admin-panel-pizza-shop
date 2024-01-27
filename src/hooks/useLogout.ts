import { useDispatch } from "react-redux";
import { useSignOutMutation } from "../store/pizzaShopApi/auth.endpoints";
import { logout } from "../store/auth/auth.slice";

export function useLogout() {
  const [signOut] = useSignOutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut();
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };

  return { handleLogout };
}
