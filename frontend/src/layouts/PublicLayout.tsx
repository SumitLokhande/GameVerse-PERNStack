import { Outlet } from "react-router";
import type { PropsWithChildren } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PublicLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div>
      <Header />
      <div className="mt-10">{children || <Outlet />}</div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
