import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signInSchema } from "../utils/signupSchema";

import Button from "../components/Button";
import CheckImage from "../../../Assets/Check.png";

function ConfirmationPage() {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const errorMessage = errors?.response?.data?.message;

  const onSubmit = () => {};

  return (
    <div className="flex items-start justify-center  flex-1 bg-light-blue">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex mt-20 flex-col bg-slate-100 p-6 rounded-2xl items-center shadow-deep  w-64 sm:min-w-md"
      >
        <h1 className="text-xl font-bold text-center sm:text-3xl ">
          Password Reset Email Sent
        </h1>
        <p className="text-xs font-bold mt-4 text-center mb-4 sm:text-lg ">
          Password reset link successfully sent to adam@gmail.com
        </p>
        {errorMessage && <p className="text-xs mt-4">{errorMessage}</p>}
        {/* inputs */}
        <div className="w-full flex flex-col items-center">
          <img src={CheckImage} className="w-30 h-30 sm:h-40 sm:w-40" />

          <Button label="Continue" rounded="rounded" />
        </div>
      </form>
    </div>
  );
}

export default ConfirmationPage;
