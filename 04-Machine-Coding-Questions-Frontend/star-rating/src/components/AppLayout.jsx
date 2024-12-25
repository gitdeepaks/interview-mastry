import { Outlet } from "react-router-dom";
import HeaDer from "./HeaDer";

const AppLayout = () => {
  return (
    <div className="p-6">
      <HeaDer />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
