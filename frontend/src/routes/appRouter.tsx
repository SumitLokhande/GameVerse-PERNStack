import { Route, Routes } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import Dashboard from "../pages/public/Dashboard";
import GamesList from "../pages/public/GamesList";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import UserProfile from "../pages/private/UserProfile";
import GameReviews from "../containers/GameReviews";
import GamesCategory from "../containers/GamesCategory";
import GOTYContainer from "../containers/GOTYContainer";
import Cart from "../pages/private/Cart";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/games" element={<GamesList />} />
        <Route path="/reviews" element={<GameReviews />} />
        <Route path="/categories" element={<GamesCategory />} />
        <Route path="/goty" element={<GOTYContainer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game-list" element={<GamesList />} />
      </Route>
      <Route element={<PrivateLayout />}>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
