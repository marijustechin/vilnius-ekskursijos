import { Outlet } from "react-router";
import { Header } from "../components/header/Header";
import { Footer } from "../components/Footer";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
