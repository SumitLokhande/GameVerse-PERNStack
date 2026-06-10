import { Navigate, Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/customHooks";

const PrivateLayout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <div>
          <Header />
          <div>
            <Outlet />
          </div>
          <Footer />
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateLayout;
