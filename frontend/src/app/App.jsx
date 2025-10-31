import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../features/Auth/pages/LandingPage";
import LoginPage from "../features/Auth/pages/LoginPage";
import RegisterPage from "../features/Auth/pages/RegisterPage";
import PageNotFound from "../features/Auth/pages/PageNotFound";
import Dashboard from "../features/Dashboard/pages/Dashboard";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../Routes/ProtectedRoute";
import PublicRoutes from "../Routes/PublicRoutes";
import RoomName from "../features/Dashboard/pages/RoomName";
import MobileProfile from "../features/Profile/MobileProfile";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import ForgotPassword from "../features/Auth/pages/ForgotPassword";
import ConfirmationPage from "../features/Auth/pages/ConfirmationPage";

function App() {
  const { Toggle_Mobile_Profile } = useSelector((state) => state.UIState);
  console.log(Toggle_Mobile_Profile);
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col relative">
        <AnimatePresence>
          {Toggle_Mobile_Profile && <MobileProfile />}
        </AnimatePresence>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoutes>
                <LandingPage />
              </PublicRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <LoginPage />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <RegisterPage />
              </PublicRoutes>
            }
          />
          <Route
            path="/forgot"
            element={
              <PublicRoutes>
                <ForgotPassword />
              </PublicRoutes>
            }
          />
          <Route
            path="/confirm-page"
            element={
              <PublicRoutes>
                <ConfirmationPage />
              </PublicRoutes>
            }
          />

          {/* this is On development that is why i did not protect the route */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/room" element={<RoomName />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
