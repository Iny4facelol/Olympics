import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/home/Home";
import CenterForm from "../../pages/center/center-form/CenterForm";
import CenterClientForm from "../../pages/center/center-client-form/CenterClientForm";
import RegisterUser from "../../pages/user/register/RegisterUser";
import LoginUser from "../../pages/user/login/LoginUser";
import UserDashboard from "../../pages/user/dashboard/components/UserDashboard";
import AdminDashboard from "../../pages/admin/adminDashboard/AdminDashboard";
import { useAppContext } from "../context/AppContext";
import ErrorPage from "../../pages/error/ErrorPage";
import CreateOlympics from "../../pages/olympics/create-olympic/CreateOlympics";
import CreateActivity from "../../pages/activity/create-activity/CreateActivity";
import CreateResponsable from "../../pages/responsable/create-responsable/CreateResponsable";

export default function AppRoutes() {
  const { user } = useAppContext();
  
  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {user?.user_type === 1 && (
          <>
            <Route path="/admin/createNewCenter" element={<CenterForm />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/createNewOlympics" element={<CreateOlympics />} />
            <Route path="/admin/createNewActivity" element={<CreateActivity />} />
            <Route path="/admin/createNewResponsable" element={<CreateResponsable />} />
          </>
        )}
        <Route
          path="/center/completeCenter/:registerToken"
          element={<CenterClientForm />}
        />
        <Route path="/user/register" element={<RegisterUser />} />
        <Route path="/user/login" element={<LoginUser />} />
        {user?.user_type === 3 && (
          <Route path="/user/dashboard" element={<UserDashboard />} />
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
