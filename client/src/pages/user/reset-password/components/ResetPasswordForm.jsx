import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast, Toaster } from "sonner";
import ButtonCustom from "../../../../core/components/Button/Button";
import { passwordSchema } from "../../../../utils/zodSchemas/registerSchema";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchData } from "../../../../utils/axios/axiosHelper";

export default function ResetPasswordForm() {
  const [authenticating, setAuthenticating] = useState(false);
  const [userId, setUserId] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.idToken;    
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {      
      const response = await fetchData(
        `api/admin/verifyTokenUser/${token}`,
        "get"
      );
      console.log(response);      
      setUserId(response.user_id);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),

    defaultValues: {
      user_password: "",
      user_confirm_password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setAuthenticating(true);
      console.log(userId);      
      await fetchData(`api/user/restorePassword/${userId}`, "put", data);
      toast.success("Contraseña actualizada correctamente");

      setTimeout(() => {
        navigate("/user/login");
        setAuthenticating(false);
      }, 3000);
    } catch (error) {
      toast.error("Ha ocurrido un error");
      setAuthenticating(false);
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
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña*</Form.Label>
            <Form.Control
              className={errors.user_password ? "is-invalid" : ""}
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
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirmar Contraseña*</Form.Label>
            <Form.Control
              className={errors.user_confirm_password ? "is-invalid" : ""}
              {...register("user_confirm_password")}
              type="password"
              placeholder="Repite la contraseña"
            />
            {errors.user_confirm_password && (
              <Form.Text className="text-danger">
                {errors.user_confirm_password.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>
      <div>
        <Toaster richColors position="bottom-center" />
        <ButtonCustom type={"submit"} bgColor={"orange"}>
          {authenticating ? "Guardando cambios..." : "Cambiar contraseña"}
        </ButtonCustom>
      </div>
    </Form>
  );
}
