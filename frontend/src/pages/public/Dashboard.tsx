import Banner from "../../components/Banner";
import GamesCategory from "../../containers/GamesCategory";
import GOTYContainer from "../../containers/GOTYContainer";
import GameReviews from "../../containers/GameReviews";

const Dashboard = () => {
  return (
    <div className="mt-16">
      <Banner />
      <GamesCategory />
      <GOTYContainer />
      <GameReviews />
    </div>
  );
};

export default Dashboard;
