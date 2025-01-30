import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../../utils/zodSchemas/loginSchema";
import ScrollReveal from "scrollreveal";
import { useTranslation } from "react-i18next";

export default function Section5() {
  const {t} = useTranslation()
  const [authenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    ScrollReveal().reveal(".reveal", {
      distance: "50px",
      duration: 500,
      delay: 200,
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
            {t("home.section5.contactUs")} <span className="custom-span">{t("home.section5.us")}</span>
          </h2>
          <p>
            {t("home.section5.text")}
          </p>
        </Col>
      </Row>
      <Form className="d-flex flex-column gap-4">
        <Row>
          <Col md={6} sm={12}>
            <Form.Group controlId="formBasicUserName">
              <Form.Label>{t("home.section5.name")}*</Form.Label>
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
              <Form.Label>{t("home.section5.email")}*</Form.Label>
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
              <Form.Label>{t("home.section5.message")}*</Form.Label>
              <Form.Control
                as="textarea"
                className={`custom-input ${
                  errors.user_message ? "is-invalid" : ""
                }`}
                {...register("user_message")}
                type="text"
                placeholder={t("home.section5.messagePlaceholder")}
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
            {authenticating ? t("home.section5.sendingMessage") : t("home.section5.sendButton")}
          </ButtonCustom>
        </div>
      </Form>
    </section>
  );
}
