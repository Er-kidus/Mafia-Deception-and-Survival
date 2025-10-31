import { ChartNoAxesColumn, Megaphone, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import MobileProfile from "../../Profile/MobileProfile";

function Dashboard() {
  return (
    <div className="flex-1 flex flex-col p-4 bg-light-blue">
      {/* Dashboard */}
      <div className="flex flex-col gap-4 items-center mt-10 text-white">
        <h1 className="text-4xl font-semibold  tracking-widest ">Mafia</h1>
        {/* buttons */}
        <div className="bg-middle-blue flex flex-col gap-4 items-center px-10 py-4 shadow-deep rounded-xl mt-4 sm:min-w-sm sm:gap-8 sm:font-semibold sm:py-8 md:min-w-md  ">
          <Link className="px-4 py-1 bg-black rounded font-semibold sm:min-w-46 sm:text-center shadow-normal sm:bg-black/80">
            Host
          </Link>
          <Link className="px-4 py-1 bg-black rounded sm:min-w-46 sm:text-center shadow-normal sm:bg-black/80">
            Join
          </Link>
          <Link className="px-4 py-1 bg-black rounded text-center sm:min-w-64 shadow-normal sm:bg-black/80">
            How to Play
          </Link>
        </div>

        {/* Settings */}
        <div className="flex gap-10 mt-4">
          <Megaphone />
          <ChartNoAxesColumn strokeWidth={3} />
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
