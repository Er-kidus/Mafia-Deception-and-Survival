function RoomName() {
  return (
    <div className="flex-1 flex flex-col  p-4 bg-light-blue">
      {/* container */}
      <div className="flex flex-col gap-2 items-center justify-center mt-20 text-white">
        <h1 className="text-sm font-govorner font-light  tracking-widest ">
          Give the room a name{" "}
        </h1>
        <div className="border-b border-white w-full" />
      </div>
    </div>
  );
}

export default RoomName;
