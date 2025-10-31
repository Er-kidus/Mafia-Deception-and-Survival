import { Link } from "react-router-dom";
import logo from "../../../Assets/mafiaLogo.jpg";

function LandingPage() {
  return (
    <div className="flex-1 bg-light-blue flex flex-col  items-center text-white sm:justify-center">
      <div className="mt-10 sm:mt-0 flex flex-col items-center gap-5 sm:gap-10 md:gap-16 lg:gap-20 px-4 sm:flex sm:flex-row-reverse sm:justify-between  sm:items-center">
        {/* header */}
        <h1 className="font-govorner text-3xl sm:hidden">Trust No One</h1>
        {/* image */}
        <div>
          <img
            src={logo}
            alt=""
            className="rounded-full w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] "
          />
        </div>

        {/*insight intro  */}
        <div className="font-govorner mb-10 flex flex-col gap-8 sm:max-w-sm md:max-w-md lg:max-w-lg  sm:mb-0 ">
          <div>
            <h1 className="hidden sm:block  sm:text-6xl font-govorner text-3xl ">
              Trust No One
            </h1>
            <p>
              Step into a world of lies, loyalty, and betrayal. Can you outsmart
              your friends and survive the night?
            </p>
            <br />
            <p>
              Step into a world of lies, loyalty, and betrayal. Can you outsmart
              your friends and survive the night?
            </p>
            <br />
            <p>
              Step into a world of lies, loyalty, and betrayal. Can you outsmart
              your friends and survive the night?
            </p>
          </div>

          {/* Button */}
          <Link
            to="/register"
            className="font-govorner self-center tracking-wider bg-black px-6 py-2 font-bold rounded-full cursor-pointer"
          >
            Join Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
