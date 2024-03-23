import { Outlet } from "react-router-dom";
import { LeftNav } from "../LeftNav";
import { TopBar } from "../TopBar";

export function AppLayout() {
  return (
    <div className="flex">
      <LeftNav />
      <div>
        <TopBar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
