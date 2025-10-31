import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signInSchema } from "../utils/signupSchema";
import CustomInput from "../components/Input";
import Button from "../components/Button";

function ForgotPassword() {
  const {
    register,
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
        className="flex mt-20 flex-col bg-slate-100 p-6 rounded-2xl items-center shadow-deep  w-64 sm:min-w-sm"
      >
        <h1 className="text-xl font-bold sm:text-3xl ">Forgot Password ?</h1>
        <p className="text-xs font-bold mt-4 text-center mb-4 sm:text-md ">
          Enter the email used for your account and we will send you a link to
          reset your password
        </p>
        {errorMessage && <p className="text-xs mt-4">{errorMessage}</p>}
        {/* inputs */}
        <div className="w-full">
          <CustomInput
            label="Email"
            {...register("email")}
            placeholder="Please input your email"
            error={errors?.email?.message}
          />

          <Button label="Reset Password" rounded="rounded" />
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
