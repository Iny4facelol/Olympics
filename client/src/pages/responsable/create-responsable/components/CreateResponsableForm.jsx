import { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import React from "react";
import { registerResponsibleSchema } from "../../../../utils/zodSchemas/registerSchema";
import { useTranslation } from "react-i18next";

export default function CreateResponsableForm() {
  const [authenticating, setAuthenticating] = useState(false);
  const [centerList, setCenterList] = useState([]);
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData("api/center/allCenters", "get");
        setCenterList(response);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar los centros");
      }
    };
    getData();
  }, []);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerResponsibleSchema),
    defaultValues: {
      user_name: "",
      user_email: "",
      user_center_id: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setAuthenticating(true);
      await fetchData(`api/admin/addResponsible`, "post", data);
      toast.success("Responsable creado correctamente");
      setTimeout(() => {
        setAuthenticating(false);
        navigate("/admin/dashboard");
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
            <Form.Label>{t("user.respName")}*</Form.Label>
            <Form.Control
              className={`custom-input ${errors.user_name ? "is-invalid" : ""}`}
              {...register("user_name")}
              type="text"
              placeholder={t("user.respNamePlacerholder")}
            />
          </Form.Group>
          {errors.user_name && (
            <Form.Text className="text-danger">
              {errors.user_name.message}
            </Form.Text>
          )}
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>{t("user.respEmail")}*</Form.Label>
            <Form.Control
              className={`custom-input ${errors.user_name ? "is-invalid" : ""}`}
              {...register("user_email")}
              type="email"
              placeholder={t("user.respEmailPlaceholder")}
            />
          </Form.Group>
          {errors.user_email && (
            <Form.Text className="text-danger">
              {errors.user_email.message}
            </Form.Text>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicCenter">
            <Form.Label>{t("user.respCenter")}*</Form.Label>
            <Form.Select
              className={errors.user_center_id ? "is-invalid" : ""}
              {...register("user_center_id")}
            >
              <option value="">{t("user.respSelectCenter")}</option>
              {centerList.map((center) => (
                <option key={center.center_id} value={center.center_id}>
                  {center.center_name}
                </option>
              ))}
            </Form.Select>
            {errors.user_center_id && (
              <Form.Text className="text-danger">
                {errors.user_center_id.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>
      <div>
        <ButtonCustom type={"submit"} bgColor={"orange"}>
          {authenticating ? t("user.respCreating") : t("user.respButton")}
        </ButtonCustom>
      </div>
    </Form>
  );
}
