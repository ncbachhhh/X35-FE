import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layouts/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import RentCar from "./pages/RentCar/RentCar.jsx";
import CarDetails from "./pages/CarDetails/CarDetails.jsx";
import Billing from "./pages/Billing/Billing.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import { NotificationProvider } from "./contexts/notification.context.js";
import { AuthProvider, useAuth } from "./contexts/auth.context.js";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail.jsx";
import LayoutAdmin from "./components/layouts/LayoutAdmin.jsx";
import HomeAdmin from "./pages/Admin/HomeAdmin/HomeAdmin.jsx";
import CreateRent from "./pages/Admin/CreateRent/CreateRent.jsx";
import ChangePassword from "./pages/ChangePassword/ChangePassword.jsx";
import RentHistory from "./pages/RentHistory/RentHistory.jsx";
import LikedCars from "./pages/LikedCars/LikedCars.jsx";


function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Validate Email */}
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* Layouts */}
            <Route path="/" element={<Layout />}>
              {/* Đăng nhập */}
              <Route path="/auth/login" element={<Login />} />

              {/* Đăng ký */}
              <Route path="/auth/signup" element={<Signup />} />

              {/* Quên mật khẩu */}
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />

              {/* Đổi mật khẩu */}
              <Route path="/auth/change-password" element={<ChangePassword />} />

              {/* Home */}
              <Route path="" element={<Home />} />

              {/* Thuê xe */}
              <Route path="/category" element={<RentCar />} />

              {/* Chi tiết xe */}
              <Route path="/category/:id" element={<CarDetails />} />

              {/* Thanh toán */}
              <Route path="/payment/:id" element={<Billing />} />

              {/* Lịch sử thuê xe */}
              <Route path="/history" element={<RentHistory />} />

              {/* Danh sách xe đã thích */}
              <Route path="/liked-cars" element={<LikedCars />} />
            </Route>

            <Route path="/admin" element={<LayoutAdmin />}>
              <Route path="" element={<HomeAdmin />} />
              <Route path="create-rent" element={<CreateRent />} />
            </Route>

            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
