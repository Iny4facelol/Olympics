import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../../utils/zodSchemas/loginSchema";
import ScrollReveal from "scrollreveal";

export default function Section5() {
  const [authenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    ScrollReveal().reveal(".reveal", {
      distance: "50px",
      duration: 800,
      delay: 550,
      easing: "ease-in-out",
      interval: 200,
      origin: "bottom",
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user_email: "",
      user_password: "",
    },
  });

  return (
    <section id="contact" className="d-flex gap-4 flex-column p-3 p-sm-2 reveal">
      <Row>
        <Col md={12} sm={12}>
          <h2 className="fw-bold fs-2">
            Contacta con <span className="custom-span">nosotros</span>
          </h2>
          <p>
            Si tienes alguna duda o sugerencia, no dudes en contactar con
            nosotros. Estamos aquí para ayudarte.
          </p>
        </Col>
      </Row>
      <Form className="d-flex flex-column gap-4">
        <Row>
          <Col md={6} sm={12}>
            <Form.Group controlId="formBasicUserName">
              <Form.Label>Nombre*</Form.Label>
              <Form.Control
                className={`custom-input ${
                  errors.user_name ? "is-invalid" : ""
                }`}
                {...register("user_name")}
                type="text"
                placeholder="Ej: Jorge"
              />
            </Form.Group>
            {errors.user_name && (
              <Form.Text className="text-danger">
                {errors.user_name.message}
              </Form.Text>
            )}
          </Col>
          <Col md={6} sm={12}>
            <Form.Group controlId="formBasicUserEmail">
              <Form.Label>Email*</Form.Label>
              <Form.Control
                className={`custom-input ${
                  errors.user_email ? "is-invalid" : ""
                }`}
                {...register("user_email")}
                type="email"
                placeholder="Ej: jorge@email.com"
              />
              {errors.user_email && (
                <Form.Text className="text-danger">
                  {errors.user_email.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12}>
            <Form.Group controlId="formBasicUserMessage">
              <Form.Label>Mensaje*</Form.Label>
              <Form.Control
                as="textarea"
                className={`custom-input ${
                  errors.user_message ? "is-invalid" : ""
                }`}
                {...register("user_message")}
                type="text"
                placeholder="Ej: Hola, quería saber más información sobre..."
              />
              {errors.user_message && (
                <Form.Text className="text-danger">
                  {errors.user_message.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>
        <div className="mt-4">
          <Toaster richColors position="top-center" />
          <ButtonCustom type={"submit"} bgColor={"orange"}>
            {authenticating ? "Enviando..." : "Enviar"}
          </ButtonCustom>
        </div>
      </Form>
    </section>
  );
}
