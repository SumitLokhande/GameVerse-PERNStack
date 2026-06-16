import Banner from "../../components/Banner";
import GamesCategory from "../../containers/GamesCategory";
import GOTYContainer from "../../containers/GOTYContainer";

const Dashboard = () => {
  return (
    <div className="mt-16">
      <Banner />
      <GamesCategory />
      <GOTYContainer />
    </div>
  );
};

export default Dashboard;
