import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { Footer, Header, NavBar } from "./components";

const App = () => {
  return (
    <>
      <NavBar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
};
export default App;
