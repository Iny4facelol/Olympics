import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCenterSchema } from "../../../../utils/zodSchemas/centerSchema";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

export default function CenterFormComp() {
  const [authenticating, setAuthenticating] = useState(false);
  const [errorMsg , setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCenterSchema),
    defaultValues: {
      center_name: "",
      center_email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setAuthenticating(true);
      await fetchData(`api/admin/addCenter`, "post", data);
      toast.success("Centro creado correctamente");
      setTimeout(() => {
        setAuthenticating(false);
        navigate("/admin/dashboard");
      }, 2000)
    } catch (error) {
      toast.error("Ha ocurrido un error");
      setAuthenticating(false);
      setErrorMsg(error.response.data.message);
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
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nombre del centro</Form.Label>
            <Form.Control
              {...register("center_name")}
              type="text"
              placeholder="Ej: IES Ribalta, IES Llombai"
            />
          </Form.Group>
          {errors.center_name && (
            <Form.Text className="text-danger">
              {errors.center_name.message}
            </Form.Text>
          )}
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control
              {...register("center_email")}
              type="email"
              placeholder="Ej: correocentro@email.com"
            />
          </Form.Group>
          {errors.center_email && (
            <Form.Text className="text-danger">
              {errors.center_email.message}
            </Form.Text>
          )}
          {errorMsg && (
            <Form.Text className="text-danger">
              {errorMsg}
            </Form.Text>
          )}
        </Col>
      </Row>
      <div>
        <Toaster richColors position="top-center" />
        <ButtonCustom type={"submit"} bgColor={"orange"}>
           {authenticating ? "Creando centro..." : "Crear centro"}
        </ButtonCustom>
      </div>
    </Form>
  );
}
