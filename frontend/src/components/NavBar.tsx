import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-blue-500">
      <div className="container mx-auto flex items-center justify-between">
        <Link to={"/"}>
          <img src="/logo.png" alt="logo-img" className="w-20 h-20" />
        </Link>
        <Link to={"/register"}>
          <button className="bg-gray-300 text-black px-4 py-2 rounded-full font-medium">
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
};
export default NavBar;
