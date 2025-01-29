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


export default function LoginUserForm({ setShowForgotPassword }) {
  const { setToken, setUser, setRememberMe, rememberMe, themeSwitcher } = useAppContext();
  const [emailErrorMsg, setEmailErrorMsg] = useState();
  const [passwordErrorMsg, setPasswordErrorMsg] = useState();
  const [authenticating, setAuthenticating] = useState(false);
  const navigate = useNavigate();
  console.log(rememberMe);
  const onSubmit = async (data) => {
    try {
      setAuthenticating(true);
      const result = await fetchData(`api/user/login`, "post", data);
      const userResult = await fetchData("api/user/findUserById", "get", null, {Authorization: `Bearer ${result.token}`} )
      toast.success("Acceso correcto");

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
    <Form className="d-flex flex-column gap-2" onSubmit={handleSubmit(onSubmit)}>
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
              placeholder="Email"
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
              placeholder="Contraseña"
            />
            {passwordErrorMsg && (
              <Form.Text className="text-danger">{passwordErrorMsg}</Form.Text>
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
            Recordar Usuario
          </Form.Text>
        </Col>
        <Col md={6} sm={12}>
          <Form.Text style={{ cursor: "pointer" }}
            className={`${themeSwitcher ? "text-secondary" : "text-white"}`}
            onClick={() => setShowForgotPassword(true)}
          >
            ¿Olvidaste tu contraseña?
          </Form.Text>
        </Col>
      </Row>

      <div className="mt-4">
        <Toaster richColors position="top-center" />
        <ButtonCustom type={"submit"} bgColor={"orange"}>
          {authenticating ? "Accediendo..." : "Acceder"}
        </ButtonCustom>
      </div>
    </Form>
  );
}
