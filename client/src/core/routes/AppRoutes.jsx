import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/home/Home";
import CenterForm from "../../pages/center/center-form/CenterForm";
import CenterClientForm from "../../pages/center/center-client-form/CenterClientForm";
import RegisterUser from "../../pages/user/register/RegisterUser";
import LoginUser from "../../pages/user/login/LoginUser";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/createNewCenter" element={<CenterForm />} />
        <Route path="/center/completeCenter/:registerToken" element={<CenterClientForm />} />
        <Route path="/user/register" element={<RegisterUser />} />
        <Route path="/user/login" element={<LoginUser />} />
      </Routes>
    </BrowserRouter>
  );
}
