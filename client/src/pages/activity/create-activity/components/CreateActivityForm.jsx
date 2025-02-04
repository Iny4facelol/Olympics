import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { activitySchema } from "../../../../utils/zodSchemas/activitySchema";
import { useTranslation } from "react-i18next";

export default function CreateActivityForm() {
    const {t} = useTranslation();
  const [file, setFile] = useState(null);
  const [authenticating, setAuthenticating] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      activity_name: "",
      activity_description: "",
      max_participants: "",
      activity_image: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setAuthenticating(true);
      const formData = new FormData();
      formData.append("activity_name", data.activity_name);
      formData.append("activity_description", data.activity_description);
      formData.append("max_participants", data.max_participants);

      if (file) {
        formData.append("img", file);
      }

      await fetchData(`api/admin/addActivity`, "post", formData);
      toast.success("Actividad creada correctamente");
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
      encType="multipart/form-data"
      className="d-flex gap-4 flex-column justify-content-center align-content-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Row className="row-gap-4">
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicActivityName">
            <Form.Label>{t("activities.activityName")}*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.activity_name ? "is-invalid" : ""
              }`}
              {...register("activity_name")}
              type="text"
              placeholder={t("activities.activityNamePlaceholder")}
            />
          </Form.Group>
          {errors.activity_name && (
            <Form.Text className="text-danger">
              {errors.activity_name.message}
            </Form.Text>
          )}
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicMaxParticipants">
            <Form.Label>{t("activities.activityMaxNumberParts")}*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.max_participants ? "is-invalid" : ""
              }`}
              {...register("max_participants", { valueAsNumber: true })}
              type="number"
              placeholder={t("activities.activityNumberPartsPlaceholder")}
            />
          </Form.Group>
          {errors.max_participants && (
            <Form.Text className="text-danger">
              {errors.max_participants.message}
            </Form.Text>
          )}
        </Col>
      </Row>
      <Row className="row-gap-4">
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicActivityImage">
            <Form.Label>{t("activities.activityImage")}*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.activity_image ? "is-invalid" : ""
              }`}
              {...register("activity_image")}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              placeholder="Imagen actividad"
            />
            {errors.activity_image && (
              <Form.Text className="text-danger">
                {errors.activity_image.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicActivityDescription">
            <Form.Label>{t("activities.activityDesc")}</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.activity_description ? "is-invalid" : ""
              }`}
              {...register("activity_description")}
              type="text"
              placeholder={t("activities.activityDescPlacerholder")}
            />
          </Form.Group>
          {errors.activity_description && (
            <Form.Text className="text-danger">
              {errors.activity_description.message}
            </Form.Text>
          )}
        </Col>
      </Row>

      <div className="mt-4">
        <Toaster richColors position="top-center" />
        <ButtonCustom type={"submit"} bgColor={"orange"}>
          {authenticating
            ? t("activities.activityCreating")
            : t("activities.activityButton")}
        </ButtonCustom>
      </div>
    </Form>
  );
}
