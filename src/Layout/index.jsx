import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const BasicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default BasicLayout;
