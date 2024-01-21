import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

type loginInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginInputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<loginInputs> = async (data: loginInputs) => {
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      await axios.post(`${baseURL}/auth/login`, data);
      navigate("/");
    } catch (error: any) {
      console.error("Registration failed:", error.response.data);
    }
  };
  return (
    <section className="flex justify-center items-center">
      <div className="mx-auto p-10 shadow-2xl flex items-center justify-center my-10 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl  mb-5 font-bold">Login</h1>
          <div className="flex flex-col">
            <label className="text-md">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Enter your email"
              className={`px-5 py-2 my-2  rounded-md ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <label className="text-md">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password shoud be 6 charector",
                },
              })}
              type="password"
              placeholder="Enter your password"
              className={`px-5 py-2 my-2 rounded-md ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="mt-5">
            <Link to={"/register"} className="mr-5">
              Don't have an account? Register
            </Link>
            <button
              type="submit"
              className="bg-blue-500 px-5 py-2 rounded-md text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
