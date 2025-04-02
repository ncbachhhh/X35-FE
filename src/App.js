import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layouts/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Đăng nhập */}
          <Route path="/auth/login" element={<Login />} />
          {/* Đăng ký */}
          <Route path="/auth/signup" element={<Signup />} />

          {/* Home */}
          <Route path="" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
