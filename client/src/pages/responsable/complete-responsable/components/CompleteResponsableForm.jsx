import { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "sonner";
import React from "react";
import { completeRegisterResponsibleSchema } from "../../../../utils/zodSchemas/registerSchema";

export default function CompleteResponsableForm() {
  const [authenticating, setAuthenticating] = useState(false);
  const [userId, setUserId] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.registerToken;
    if (token) {
      verifyToken(token);
    }
  }, [])

  const verifyToken = async (token) => {
    try {
      const response = await fetchData(
        `api/admin/verifyTokenResponsible/${token}`,
        "get"
      );
      console.log(response);
      setValue("user_name", response.user_name);
      setUserId(response.user_id);
    } catch (error) {
      console.error(error);
    }
  }


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(completeRegisterResponsibleSchema),
    defaultValues: {
      user_name: "",
      user_lastname: "",
      user_phone: "",
      user_dni: "",
      user_password: "",
      user_confirm_password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setAuthenticating(true);
      await fetchData(`api/user/completeResponsible/${userId}`, "put", data);
      toast.success("Responsable creado correctamente");
      setTimeout(() => {
        setAuthenticating(false);
        navigate("/user/login");
      }, 2000);
    } catch (error) {
      toast.error("Ha ocurrido un error");
      console.error(error);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex gap-4 flex-column justify-content-center align-content-center"
    >
      <Row className="row-gap-4">
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Nombre del responsable*</Form.Label>
            <Form.Control
              className={`custom-input ${errors.user_name ? "is-invalid" : ""}`}
              {...register("user_name")}
              type="text"
              placeholder="Ej: Juan"
            />
          </Form.Group>
          {errors.user_name && (
            <Form.Text className="text-danger">
              {errors.user_name.message}
            </Form.Text>
          )}
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicUserLastname">
            <Form.Label>Apellidos*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.user_lastname ? "is-invalid" : ""
              }`}
              {...register("user_lastname")}
              type="text"
              placeholder="Ej: Pérez Gómez"
            />
          </Form.Group>
          {errors.user_lastname && (
            <Form.Text className="text-danger">
              {errors.user_lastname.message}
            </Form.Text>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicPhone">
            <Form.Label>Teléfono*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.user_phone ? "is-invalid" : ""
              }`}
              {...register("user_phone")}
              type="text"
              placeholder="Ej: 666555432"
            />
          </Form.Group>
          {errors.user_phone && (
            <Form.Text className="text-danger">
              {errors.user_phone.message}
            </Form.Text>
          )}
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicDni">
            <Form.Label>DNI*</Form.Label>
            <Form.Control
              className={`custom-input ${errors.user_dni ? "is-invalid" : ""}`}
              {...register("user_dni")}
              type="text"
              placeholder="Ej: 12345678A"
            />
          </Form.Group>
          {errors.user_dni && (
            <Form.Text className="text-danger">
              {errors.user_dni.message}
            </Form.Text>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.user_password ? "is-invalid" : ""
              }`}
              {...register("user_password")}
              type="password"
              placeholder="Contraseña"
            />
          </Form.Group>
          {errors.user_password && (
            <Form.Text className="text-danger">
              {errors.user_password.message}
            </Form.Text>
          )}
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirmar contraseña*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.user_confirm_password ? "is-invalid" : ""
              }`}
              {...register("user_confirm_password")}
              type="password"
              placeholder="Confirmar contraseña"
            />
          </Form.Group>
          {errors.user_confirm_password && (
            <Form.Text className="text-danger">
              {errors.user_confirm_password.message}
            </Form.Text>
          )}
        </Col>
      </Row>
      <div>
        <Toaster richColors position="top-center" />
        <ButtonCustom type={"submit"} bgColor={"orange"}>
          {authenticating ? "Completando..." : "Completar registro"}
        </ButtonCustom>
      </div>
    </Form>
  );
}
