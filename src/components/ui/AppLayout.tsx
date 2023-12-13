import { Outlet } from "react-router-dom";
import LeftNav from "../LeftNav";

export default function AppLayout() {
  return (
    <div className="flex">
      <LeftNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
