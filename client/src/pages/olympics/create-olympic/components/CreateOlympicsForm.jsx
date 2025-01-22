import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { loginSchema } from "../../../../utils/zodSchemas/loginSchema";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { olympicsSchema } from "../../../../utils/zodSchemas/olympicsSchema";

export default function CreateOlympicsForm() {
  const [authenticating, setAuthenticating] = useState(false);
  const navigate = useNavigate();



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Usamos zodResolver para validar los campos del formulario
    // el esquema de validación lo importamos de utils/zodSchemas/olympicsSchema
    resolver: zodResolver(olympicsSchema),
    // Esto seria como los initialValues de un formulario de react
    // pero nos ahorramos un useState formData
    defaultValues: {
      olympics_name: "",
      olympics_host_name: "",
      olympics_host_city: "",
      olympics_host_address: "",
      olympics_start_date: "",
      olympics_end_date: "",
      olympics_description: "",
    },
  });

    const onSubmit = async (data) => {
      try {
        setAuthenticating(true);
        await fetchData(`api/admin/addOlympics`, "post", data);
        toast.success("Olimpiada creada correctamente");
        setTimeout(() => {
          setAuthenticating(false);
          navigate("/admin/dashboard");
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <Form
      className="d-flex gap-4 flex-column justify-content-center align-content-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Row className="row-gap-4">
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicOlympicsName">
            <Form.Label>Nombre de la Olimpiada*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.olympics_name ? "is-invalid" : ""
              }`}
              {...register("olympics_name")}
              type="text"
              placeholder="Nombre Olimpiada"
            />
          </Form.Group>
          {errors.olympics_name && (
            <Form.Text className="text-danger">
              {errors.olympics_name.message}
            </Form.Text>
          )}
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicOlympicsHostName">
            <Form.Label>Nombre del centro*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.olympics_host_name ? "is-invalid" : ""
              }`}
              {...register("olympics_host_name")}
              type="text"
              placeholder="Nombre del centro"
            />
          </Form.Group>
          {errors.olympics_host_name && (
            <Form.Text className="text-danger">
              {errors.olympics_host_name.message}
            </Form.Text>
          )}
        </Col>
      </Row>
      <Row className="row-gap-4">
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicOlympicsHostCity">
            <Form.Label>Localidad*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.olympics_host_city ? "is-invalid" : ""
              }`}
              {...register("olympics_host_city")}
              type="text"
              placeholder="Localidad"
            />
          </Form.Group>
          {errors.olympics_host_city && (
            <Form.Text className="text-danger">
              {errors.olympics_host_city.message}
            </Form.Text>
          )}
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicOlympicsHostAddress">
            <Form.Label>Dirección*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.olympics_host_address ? "is-invalid" : ""
              }`}
              {...register("olympics_host_address")}
              type="text"
              placeholder="Dirección del centro"
            />
          </Form.Group>
          {errors.olympics_host_address && (
            <Form.Text className="text-danger">
              {errors.olympics_host_address.message}
            </Form.Text>
          )}
        </Col>
      </Row>
      <Row className="row-gap-4">
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicOlympicsStartDate">
            <Form.Label>Fecha de inicio*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.olympics_start_date ? "is-invalid" : ""
              }`}
              {...register("olympics_start_date")}
              type="date"
            />
          </Form.Group>
          {errors.olympics_start_date && (
            <Form.Text className="text-danger">
              {errors.olympics_start_date.message}
            </Form.Text>
          )}
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicOlympicsEndDate">
            <Form.Label>Fecha de fin*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.olympics_end_date ? "is-invalid" : ""
              }`}
              {...register("olympics_end_date")}
              type="date"
            />
          </Form.Group>
          {errors.olympics_end_date && (
            <Form.Text className="text-danger">
              {errors.olympics_end_date.message}
            </Form.Text>
          )}
        </Col>
      </Row>
      <Row>
          <Col md={6} sm={12}>
            <Form.Group controlId="formBasicOlympicsDesc">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                className={`custom-input ${
                  errors.olympics_description ? "is-invalid" : ""
                }`}
                {...register("olympics_description")}
                type="text"
                placeholder="Descripción de la olimpiada"
              />
            </Form.Group>
            {errors.olympics_description && (
              <Form.Text className="text-danger">
                {errors.olympics_description.message}
              </Form.Text>
            )}
          </Col>
      </Row>

      <div className="mt-4">
        <Toaster richColors position="top-center" />
        <ButtonCustom type={"submit"} bgColor={"orange"}>
          {authenticating ? "Creando..." : "Crear Olimpiada"}
        </ButtonCustom>
      </div>
    </Form>
  );
}
