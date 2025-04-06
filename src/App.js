import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layouts/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import RentCar from "./pages/RentCar/RentCar.jsx";
import CarDetails from "./pages/CarDetails/CarDetails.jsx";
import Billing from "./pages/Billing/Billing.jsx";

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

          {/* Thuê xe */}
          <Route path="/category" element={<RentCar />} />

          {/* Chi tiết xe */}
          <Route path="/category/:id" element={<CarDetails />} />

          {/* Thanh toán */}
          <Route path="/payment/:id" element={<Billing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
