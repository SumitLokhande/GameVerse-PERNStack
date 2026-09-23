import { Suspense } from "react";
import Banner from "../../components/Banner";
import GamesCategory from "../../containers/GamesCategory";
import GOTYContainer from "../../containers/GOTYContainer";

const Dashboard = () => {
  return (
    <div className="mt-16">
      <Suspense fallback={<div>Loading...</div>}>
        <Banner />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <GamesCategory />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <GOTYContainer />
      </Suspense>
    </div>
  );
};

export default Dashboard;
