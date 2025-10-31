import { useSelector } from "react-redux";

function NavProfile() {
  const user = useSelector((state) => state.user);
  return (
    <div className="hidden sm:flex sm:justify-center sm:items-center gap-2 ">
      <div className="size-10 rounded-full bg-green-200" />
      <div className="flex flex-col gap-">
        <p className="text-sm font-bold">
          {user?.user?.username
            ? user.user.username.charAt(0).toUpperCase() +
              user.user.username.slice(1)
            : ""}
        </p>

        <p className="text-xs">{user.user.nickname}</p>
      </div>
    </div>
  );
}

export default NavProfile;
