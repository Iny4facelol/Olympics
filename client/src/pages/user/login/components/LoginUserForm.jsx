import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../../utils/zodSchemas/loginSchema";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { toast, Toaster } from "sonner";
import { useAppContext } from "../../../../core/context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  signInWithGoogle,
  logOutGoogle,
} from "../../../../firebase/fireBaseAuth"; // Asegúrate de importar correctamente las funciones
import { useTranslation } from "react-i18next";
import logoGoogle from "../../../../assets/logoGoogle.svg";

export default function LoginUserForm({ setShowForgotPassword }) {
  const { t } = useTranslation();
  const { setToken, setUser, setRememberMe, rememberMe, themeSwitcher } =
    useAppContext();
  const [emailErrorMsg, setEmailErrorMsg] = useState();
  const [passwordErrorMsg, setPasswordErrorMsg] = useState();
  const [authenticating, setAuthenticating] = useState(false);
  const [authenticatingGoogle, setAuthenticatingGoogle] = useState(false);
  const [googleUser, setGoogleUser] = useState(null); // Estado para el usuario de Google
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setAuthenticating(true);
      const result = await fetchData(`api/user/login`, "post", data);
      const userResult = await fetchData("api/user/findUserById", "get", null, {
        Authorization: `Bearer ${result.token}`,
      });
      toast.success(t("auth.toastMessage"));
      setEmailErrorMsg();
      setPasswordErrorMsg();
      setToken(result.token);
      setUser(userResult);
      setTimeout(() => {
        if (userResult.user_type === 1) {
          navigate("/admin/dashboard");
        } else if (userResult.user_type === 2) {
          navigate("/user/res_dashboard");
        } else if (userResult.user_type === 3) {
          navigate("/user/dashboard");
        }
        setAuthenticating(false);
      }, 2000);
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        setAuthenticating(false);
        setEmailErrorMsg(error.response.data.emailError);
        setPasswordErrorMsg(error.response.data.passwordError);
      }
    }
  };

  const handleLoginGoogle = async () => {
    try {
      const user = await signInWithGoogle(); // Llama la función de login con Google
      if (!user) return;

      // Obtener el token de Google
      const googleToken = await user.getIdToken();

      // Enviar el token al backend para validarlo
      const response = await fetch(
        "http://localhost:4000/api/user/loginWithGoogle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ googleToken }),
        }
      );
      console.log(response);
      // Validar la respuesta del backend
      if (!response.ok) {
        throw new Error("Error en la autenticación con el backend");
      }

      const data = await response.json();

      setAuthenticatingGoogle(true);
      if (data.token) {
        setToken(data.token);
        setUser(data.user);
        // Redirigir según el tipo de usuario
        setTimeout(() => {
          if (data.user.user_type === 1) {
            navigate("/admin/dashboard");
          } else if (data.user.user_type === 2) {
            navigate("/user/res_dashboard");
          } else if (data.user.user_type === 3) {
            navigate("/user/dashboard");
          }
          setAuthenticatingGoogle(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  // Maneja logout con Google
  const handleLogoutGoogle = async () => {
    await logOutGoogle(); // Llama la función para cerrar sesión con Google
    setGoogleUser(null); // Limpia el estado del usuario
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Usamos zodResolver para validar los campos del formulario
    // el esquema de validación lo importamos de utils/zodSchemas/loginSchema
    resolver: zodResolver(loginSchema),
    // Esto seria como los initialValues de un formulario de react
    // pero nos ahorramos un useState formData
    defaultValues: {
      user_email: "",
      user_password: "",
    },
  });

  return (
    <>
      <Form
        className="d-flex flex-column gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row className="row-gap-2">
          <Col md={6} sm={12}>
            <Form.Group controlId="formBasicUserEmail">
              <Form.Label>Email*</Form.Label>
              <Form.Control
                className={`custom-input ${
                  errors.user_email ? "is-invalid" : ""
                }`}
                {...register("user_email")}
                type="text"
                placeholder={t("auth.emailPlaceholder")}
              />
            </Form.Group>
            {emailErrorMsg && (
              <Form.Text className="text-danger">{emailErrorMsg}</Form.Text>
            )}
            {errors.user_email && (
              <Form.Text className="text-danger">
                {errors.user_email.message}
              </Form.Text>
            )}
          </Col>
          <Col md={6} sm={12}>
            <Form.Group controlId="formBasicUserPassword">
              <Form.Label>Password*</Form.Label>
              <Form.Control
                className={`custom-input ${
                  errors.user_password ? "is-invalid" : ""
                }`}
                {...register("user_password")}
                type="password"
                placeholder={t("auth.passwordPlaceholder")}
              />
              {passwordErrorMsg && (
                <Form.Text className="text-danger">
                  {passwordErrorMsg}
                </Form.Text>
              )}
              {errors.user_password && (
                <Form.Text className="text-danger">
                  {errors.user_password.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row className="row-gap-2">
          <Col className="d-flex gap-2" md={6} sm={12}>
            <Form.Check // prettier-ignore
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <Form.Text
              className={`${themeSwitcher ? "text-secondary" : "text-white"}`}
            >
              {t("auth.rememberUser")}
            </Form.Text>
          </Col>
          <Col md={6} sm={12}>
            <Form.Text
              style={{ cursor: "pointer" }}
              className={`${themeSwitcher ? "text-secondary" : "text-white"}`}
              onClick={() => setShowForgotPassword(true)}
            >
              {t("auth.forgotPasswordLink")}
            </Form.Text>
          </Col>
        </Row>

        <div className="mt-2 d-flex gap-3">
          <div className="mt-2">
            <ButtonCustom type={"submit"} bgColor={"orange"}>
              {authenticating ? t("auth.accessing") : t("auth.access")}
            </ButtonCustom>
          </div>

          {/* Botones de login con Google */}
          <div className="mt-2">
            {googleUser ? (
              <ButtonCustom
                type={"button"}
                bgColor={"orange"}
                onClick={handleLogoutGoogle}
              >
                Cerrar sesión con Google
              </ButtonCustom>
            ) : (
              <ButtonCustom
                type={"button"}
                bgColor={themeSwitcher ? "google" : "google-dark"}
                onClick={handleLoginGoogle}
              >
                {authenticatingGoogle
                  ? t("auth.googleLogging")
                  : t("auth.googleLogin")}{" "}
                <img src={logoGoogle} alt="Google" width="24" height="24" />
              </ButtonCustom>
            )}
          </div>
        </div>
      </Form>
    </>
  );
}
