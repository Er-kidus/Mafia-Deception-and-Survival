function Button({ label, type = "submit", rounded = "rounded-full" }) {
  return (
    <button
      type={type}
      className={`w-full shadow-normal mt-4 text-center font-bold ${rounded} px-4 py-2 bg-blue-600 cursor-pointer text-white hover:bg-blue-700 transition-colors`}
    >
      {label}
    </button>
  );
}

export default Button;
