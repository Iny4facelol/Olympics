import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/home/Home";
import CenterForm from "../../pages/center/center-form/CenterForm";
import CenterClientForm from "../../pages/center/center-client-form/CenterClientForm";
import RegisterUser from "../../pages/user/register/RegisterUser";
import LoginUser from "../../pages/user/login/LoginUser";
import UserDashboard from "../../pages/user/dashboard/UserDashboard";
import AdminDashboard from "../../pages/admin/adminDashboard/AdminDashboard";
import { useAppContext } from "../context/AppContext";
import ErrorPage from "../../pages/error/ErrorPage";
import CreateOlympics from "../../pages/olympics/create-olympic/CreateOlympics";
import CreateActivity from "../../pages/activity/create-activity/CreateActivity";
import CreateResponsable from "../../pages/responsable/create-responsable/CreateResponsable";
import CompleteResponsable from "../../pages/responsable/complete-responsable/CompleteResponsable";
import ResponsibleDashboard from "../../pages/responsable/dashboard-responsible/DashboardResponsible";
import AdminActivity from "../../pages/activity/admin-activity/AdminActivity";
import AdminOlympics from "../../pages/olympics/admin-olympics/AdminOlympics";
import AdminCenter from "../../pages/center/admin-center/AdminCenter";
import AdminUser from "../../pages/user/admin-user/AdminUser";
import AsignActivity from "../../pages/activity/asign-activity/AsignActivity";
import ValidationPage from "../../pages/user/validation/ValidationPage";
import AuthUsers from "../../pages/responsable/auth-users/AuthUsers";
import { ResetPassword } from "../../pages/user/reset-password/ResetPassword";

export default function AppRoutes() {
  const { user } = useAppContext();

  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Las rutas que existen cuando el user es Admin (1) */}
        {user?.user_type === 1 && (
          <>
            <Route path="/admin/createNewCenter" element={<CenterForm />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin/createNewOlympics"
              element={<CreateOlympics />}
            />
            <Route
              path="/admin/createNewActivity"
              element={<CreateActivity />}
            />
            <Route
              path="/admin/createNewResponsable"
              element={<CreateResponsable />}
            />
            <Route path="/admin/manageActivities" element={<AdminActivity />} />
            <Route path="/admin/manageOlympics" element={<AdminOlympics />} />
            <Route path="/admin/manageCenters" element={<AdminCenter />} />
            <Route path="/admin/manageUsers" element={<AdminUser />} />
          </>
        )}
        {/* Las rutas que existen cuando el user es Resp (2) */}
        {user?.user_type === 2 && (
          <>
            <Route
              path="/user/res_dashboard"
              element={<ResponsibleDashboard />}
            />
            <Route
              path="/user/res_dashboard/addActivitiesToUser"
              element={<AsignActivity />}
            />
            <Route
              path="/user/res_dashboard/authUser"
              element={<AuthUsers />}
            />
          </>
        )}
        {/* Las rutas que existen cuando el user es Alumno (3) */}
        {user?.user_type === 3 && (
          <Route path="/user/dashboard" element={<UserDashboard />} />
        )}
        {/* Las rutas generales */}
        <Route
          path="/center/completeCenter/:registerToken"
          element={<CenterClientForm />}
        />
        <Route
          path="/user/completeResponsible/:registerToken"
          element={<CompleteResponsable />}
        />
        <Route path="/user/validateUser/:validationToken" element={<ValidationPage />} />
        <Route path="/user/register" element={<RegisterUser />} />
        <Route path="/user/login" element={<LoginUser />} />
        <Route path="/user/resetPassword/:idToken" element={< ResetPassword/>} />       
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
