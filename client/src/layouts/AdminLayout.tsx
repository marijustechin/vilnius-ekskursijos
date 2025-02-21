import { Outlet } from "react-router";
import { Topbar } from "../components/admin/topbar/Topbar";
import { Footer } from "../components/admin/footer/Footer";
import { Sidebar } from "../components/admin/sidebar/Sidebar";

export const AdminLayout = () => {
  return (
    <>
      <Topbar />
      <div className="flex gap-2">
        <div className="flex-1">
          <Sidebar />
        </div>
        <div className="flex-4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};
