import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

type TRegiserInputs = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegiserInputs>();

  const naviage = useNavigate();
  const onSubmit: SubmitHandler<TRegiserInputs> = async (
    data: TRegiserInputs
  ) => {
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      await axios.post(`${baseURL}/users/register`, data);
      naviage("/");
    } catch (error: any) {
      console.error("Registration failed:", error.response.data);
    }
  };

  return (
    <section className="flex justify-center items-center">
      <div className="mx-auto p-10 shadow-2xl flex items-center justify-center my-10 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl  mb-2 font-bold">Register</h1>
          <div className="flex flex-col">
            <label className="text-md  ">Fisrt name</label>
            <input
              {...register("firstname", { required: "First name is required" })}
              type="text"
              placeholder="Enter your first name"
              className={`px-5 py-2 my-2  rounded-md ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.firstname && (
              <p className="text-red-500">{errors.firstname.message}</p>
            )}

            <label className="text-md  ">Last name</label>
            <input
              {...register("lastname", { required: "Last name is required" })}
              type="text"
              placeholder="Enter your first name"
              className="px-5 py-2 my-2 rounded-md "
            />
            {errors.lastname && (
              <p className="text-red-500"> {errors.lastname.message} </p>
            )}
            <label className="text-md  ">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Enter your email"
              className="px-5 py-2 my-2 rounded-md "
            />
            {errors.email && (
              <p className="text-red-500"> {errors.email.message} </p>
            )}
            <label className="text-md  ">Password</label>
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
              className="px-5 py-2 my-2 rounded-md "
            />
            {errors.password && (
              <p className="text-red-500"> {errors.password.message} </p>
            )}
          </div>
          <div className="mt-5">
            <Link to={"/login"} className=" mr-5">
              Alredy have account? login
            </Link>
            <button className="bg-blue-500  px-5 py-2 rounded-md text-white ">
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Register;
