import { yupResolver } from "@hookform/resolvers/yup";

import { signupSchema } from "../utils/signupSchema";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/Input";
import { useRegister } from "../hooks";
import { toast } from "react-toastify";

import { Waveform } from "ldrs/react";
import "ldrs/react/Waveform.css";
import { saveUser } from "../slice";
import { useDispatch, useSelector } from "react-redux";

// Default values shown

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });
  const { mutate, isError, error, isPending } = useRegister();
  const errorMessage = error?.response?.data?.message;

  const onSubmit = (data) => {
    const { email, username, password } = data;

    mutate(
      { username, email, password },
      {
        onSuccess: (res) => {
          toast.success("Registration successful!");
          console.log(res);
          dispatch(saveUser(res));
          navigate("/dashboard");
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || "Something went wrong!");
        },
      }
    );
  };

  return (
    <div className=" flex-1 w-full flex items-center justify-center bg-light-blue px-6">
      {/* Register form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-slate-100 p-6 rounded-2xl items-center shadow-deep min-w-[100px] sm:min-w-sm"
      >
        <h1 className="text-xl font-bold ">Register</h1>
        {errorMessage && <p className="text-xs mt-4">{errorMessage}</p>}
        {/* inputs */}
        <div className="w-full">
          <CustomInput
            label="Username"
            {...register("username")}
            placeholder="Please input your name"
            error={errors?.username?.message}
          />
          <CustomInput
            label="Email"
            {...register("email")}
            placeholder="Please input your email"
            error={errors?.email?.message}
          />
          <CustomInput
            label="Password"
            {...register("password")}
            placeholder="Please input your password"
            error={errors?.password?.message}
          />
          {isPending ? (
            <div className="mt-4 flex items-center justify-center">
              <Waveform
                size="35"
                stroke="3.5"
                speed="1"
                color="purple"
                className="mt-4"
              />
            </div>
          ) : (
            <Button label="Signup" />
          )}
          <p className="text-xs mt-2 sm:text-[16px]">
            Already have an account ?{" "}
            <span className="text-blue-600 font-bold">
              <Link to="/login">Sign in</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
