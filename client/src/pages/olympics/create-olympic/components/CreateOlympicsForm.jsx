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
import { useTranslation } from "react-i18next";

export default function CreateOlympicsForm() {
  const {t} = useTranslation();
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
        toast.success(t("olympics.toastMessage"));
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
            <Form.Label>{t("olympics.olympicsName")}*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.olympics_name ? "is-invalid" : ""
              }`}
              {...register("olympics_name")}
              type="text"
              placeholder={t("olympics.olympicsNamePlaceholder")}
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
            <Form.Label>{t("olympics.olympicsHostName")}*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.olympics_host_name ? "is-invalid" : ""
              }`}
              {...register("olympics_host_name")}
              type="text"
              placeholder={t("olympics.olympicsHostNamePlaceholder")}
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
            <Form.Label>{t("olympics.olympicsHostCity")}*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.olympics_host_city ? "is-invalid" : ""
              }`}
              {...register("olympics_host_city")}
              type="text"
              placeholder={t("olympics.olympicsHostCityPlaceholder")}
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
            <Form.Label>{t("olympics.olympicsAddress")}*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.olympics_host_address ? "is-invalid" : ""
              }`}
              {...register("olympics_host_address")}
              type="text"
              placeholder={t("olympics.olympicsAddressPlaceholder")}
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
            <Form.Label>{t("olympics.startDate")}*</Form.Label>
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
            <Form.Label>{t("olympics.endDate")}*</Form.Label>
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
              <Form.Label>{t("olympics.olympicsDescription")}</Form.Label>
              <Form.Control
                className={`custom-input ${
                  errors.olympics_description ? "is-invalid" : ""
                }`}
                {...register("olympics_description")}
                type="text"
                placeholder={t("olympics.olympicsDescriptionPlaceholder")}
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
          {authenticating ? t("olympics.olympicsCreating") : t("olympics.olympicsButton")}
        </ButtonCustom>
      </div>
    </Form>
  );
}
