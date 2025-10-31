import React from "react";

const CustomInput = React.forwardRef(
  ({ error, placeholder, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full mt-2">
        <label htmlFor="" className="font-bold text-sm">
          {label}
        </label>
        <input
          ref={ref}
          type="text"
          className="px-4 py-1 border-2 text-xs sm:text-lg  rounded-md shadow-deep border-purple-500 outline-none placeholder:text-xs sm:placeholder:text-[16px]"
          placeholder={placeholder}
          {...props}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

export default CustomInput;
