import { Container } from "react-bootstrap";
import ButtonCustom from "./Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";


export default function HeaderHome() {
  const { user, setUser, setToken } = useAppContext();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (user?.user_type === 1) {
      navigate("/admin/dashboard");
    } else if(user?.user_type === 2) {
      navigate("/user/res_dashboard");
    } else if(user?.user_type === 3) {
      navigate("/user/dashboard");
    } else {
      navigate("/user/register");
    }
  };

  const handleLogout = () => {
    if(user) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setToken(null);
      navigate("/");
    } else {
      navigate("/user/login");
    }
  };

  return (
    <header className="header-user">
      <Container className="d-flex gap-5 py-4 justify-content-center justify-content-sm-between align-items-center flex-column flex-sm-row">
        <div className="user-select-none">
          <img className="user-select-none" src="/olympicslogo.png" alt="" />
        </div>
        <nav className="d-flex justify-content-center w-sm-75 w-100 justify-content-sm-between align-content-center py-0 py-sm-4 home-nav">
          <div className="d-flex w-100 justify-content-center justify-content-sm-evenly align-items-center gap-2 custom-shadow p-3 rounded-4">
            <article className="d-flex justify-content-between align-items-center gap-4 user-select-none d-none d-lg-flex">
              <Link to="/" className="link-hover fw-semibold">
                Inicio
              </Link>
              <Link to="/" className="link-hover fw-semibold ">
                Sobre nosotros
              </Link>
              <Link to="/" className="link-hover fw-semibold">
                Misión
              </Link>
              <Link to="/" className="link-hover fw-semibold">
                Contacto
              </Link>
            </article>
            <article className="d-flex justify-content-between align-items-center gap-2">
              <ButtonCustom onClick={handleNavigate} bgColor={"white"}>
                {user ? "Ir al Perfil" : "Regístrate"}
              </ButtonCustom>
              <ButtonCustom onClick={handleLogout} bgColor={"orange"}>
                {user ? "Cerrar sesión" : "Accede"}
              </ButtonCustom>
            </article>
          </div>
        </nav>
      </Container>
    </header>
  );
}
