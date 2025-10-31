import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signInSchema } from "../utils/signupSchema";
import CustomInput from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveUser } from "../slice";

function LoginPage() {
  const login = useLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });
  const errorMessage = errors?.response?.data?.message;

  const onSubmit = (data) => {
    console.log(data);
    login.mutate(data, {
      onSuccess: (res) => {
        toast.success("Registration successful!");
        console.log(res);
        dispatch(saveUser(res));
        navigate("/dashboard");
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Something went wrong!");
      },
    });
  };

  return (
    <div className=" flex-1 w-full flex items-center justify-center bg-light-blue px-6">
      {/* Register form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-slate-100 p-6 rounded-2xl items-center shadow-deep min-w-[100px] sm:min-w-sm"
      >
        <h1 className="text-xl font-bold ">Login</h1>
        {errorMessage && <p className="text-xs mt-4">{errorMessage}</p>}
        {/* inputs */}
        <div className="w-full">
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
          <Button label="Login" />

          <div>
            <p className="text-xs mt-2 sm:text-[16px] ">
              <span className="text-blue-600 font-bold">
                <Link to="/forgot">Forget Password ?</Link>
              </span>
            </p>
            <p className="text-xs  sm:text-[16px] ">
              Don't have an account ?{" "}
              <span className="text-blue-600 font-bold">
                <Link to="/register">Sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
