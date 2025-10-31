import { Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function UsignedButtons() {
  const link = useLocation();
  return (
    <>
      <Sun />

      {link.pathname === "/" ? (
        <Link
          to="/login"
          className="font-bold px-4   sm:px-6 py-2 bg-black rounded-full text-xs"
        >
          Sign in
        </Link>
      ) : (
        <Link
          to="/register"
          className="font-bold px-4   sm:px-6 py-2 bg-black rounded-full text-xs"
        >
          Sign up
        </Link>
      )}
    </>
  );
}

export default UsignedButtons;
