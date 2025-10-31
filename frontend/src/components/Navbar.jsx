import { Menu, Sun } from "lucide-react";
import logo from "../Assets/mafiaLogo.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavProfile from "./NavProfile";
import UsignedButtons from "./UsignedButtons";
import { toggleMoblieProfile } from "../app/uiSlice";

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="bg-dark-blue px-4 sm:px-16 shadow-deep z-20 py-1 flex justify-between items-center">
      {/* Logo  */}
      <Link to="/">
        <img
          src={logo}
          alt=""
          className="h-12 w-12 object-cover rounded-full"
        />
      </Link>

      {/* Sign in  */}
      <div className="flex items-center gap-2 sm:gap-4 text-white ">
        {user.accessToken && (
          <Menu
            size={30}
            className="sm:hidden"
            onClick={() => dispatch(toggleMoblieProfile())}
          />
        )}
        {user.accessToken ? <NavProfile /> : <UsignedButtons />}
      </div>
    </div>
  );
}

export default Navbar;
