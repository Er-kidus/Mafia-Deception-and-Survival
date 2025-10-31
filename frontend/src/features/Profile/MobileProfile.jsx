import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleMoblieProfile } from "../../app/uiSlice";
import { Bell, Flag, LifeBuoy, LogOut, User } from "lucide-react";

function MobileProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);

  return (
    <div
      onClick={() => dispatch(toggleMoblieProfile())}
      className="absolute z-40 h-full w-full bg-black/20 text-white p-4 shadow-lg overflow-hidden"
    >
      {/* Profile container with slide animation */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 15,
          duration: 0.4,
        }}
        className="absolute top-0 right-0 h-full w-2/3 bg-light-blue shadow-xl rounded-l-md flex flex-col px-4 py-2 gap-8"
      >
        <div className="rounded-bl-2xl rounded-tr-2xl bg-middle-blue w-full shadow-deep">
          <div className="flex items-center gap-2 p-4">
            {/* User Image */}
            <div className="p-4 bg-green-400 h-12 w-12 object-cover rounded-full">
              {/* <img
                src=""
                alt=""
                className="bg-green-400 h-12 w-12 object-cover rounded-full"
              /> */}
            </div>

            {/* User Name */}
            <div className="text-xs">
              <h3 className="font-semibold">{user?.username}</h3>
              <h4 className="text-xs">{user?.email}</h4>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <User />
            <p>Edit Profile</p>
          </div>
          <div className="flex gap-4">
            <Bell />
            <p>notification</p>
          </div>
          <div className="flex gap-4">
            <Flag />
            <p>Report</p>
          </div>
          <div className="flex gap-4">
            <LifeBuoy />
            <p>Help & Support</p>
          </div>
          <div className="flex gap-4">
            <LogOut />
            <p>Logout</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default MobileProfile;
