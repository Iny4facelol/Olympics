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

export default function LoginUserForm() {
  const { setToken, setUser } = useAppContext();
  const [authenticating, setAuthenticating] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setAuthenticating(true);
      const result = await fetchData(`api/user/login`, "post", data);
      toast.success("Acceso correcto");      
      setToken(result.token);
      setUser(result.user);
      setTimeout(() => {
        if(result.user.user_type === 1) {
          navigate("/admin/dashboard");
        } else if (result.user.user_type === 2) {
          navigate("/user/res_dashboard");
        } else if (result.user.user_type === 3) {
          navigate("/user/dashboard");
        }
        setAuthenticating(false);
      }, 2000);
    } catch (error) {
      if(error instanceof axios.AxiosError) {
      console.error(error.response.data.message);
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
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
            {errors.user_password && (
              <Form.Text className="text-danger">
                {errors.user_password.message}
              </Form.Text>
            )}
          </Form.Group>
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
