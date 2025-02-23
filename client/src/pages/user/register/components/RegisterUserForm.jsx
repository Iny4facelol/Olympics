import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../../../utils/zodSchemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

export default function RegisterUserForm() {
  const {t} = useTranslation();
  const [centerList, setCenterList] = useState([]);
  const [authenticating, setAuthenticating] = useState(false);
  const navigate = useNavigate();

  // Destructuramos los métodos y propiedades que nos da useForm
  // de la libreria react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Usamos zodResolver para validar los campos del formulario
    // el esquema de validación lo importamos de utils/zodSchemas/registerSchema
    resolver: zodResolver(registerSchema),
    // Esto seria como los initialValues de un formulario de react
    // pero nos ahorramos un useState formData
    defaultValues: {
      user_name: "",
      user_lastname: "",
      user_tutor_name: "",
      user_tutor_lastname: "",
      user_dni: "",
      user_city: "",
      user_address: "",
      user_phone: "",
      user_birth_date: "",
      user_email: "",
      user_password: "",
      user_confirm_password: "",
      user_center_id: "",
    },
  });


  //Traemos los centros para mostrarlos en el formulario
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

  const onSubmit = async (data) => {
    try {
      // Ponemos el estado de autenticando a true para renderizar
      // el botón de registrando
      setAuthenticating(true);
      await fetchData(`api/user/register`, "post", data);
      toast.success(t("register.toastMessage"));
      // Redirigimos al usuario a la página de login después de 3 segundos para dar sensacion de carga
      setTimeout(() => {
        navigate("/user/login");
        setAuthenticating(false);
      }, 3000);
    } catch (error) {
      // Si hay un error, ponemos el estado de autenticando a false
      setAuthenticating(false);
      console.error(error);
    }
  };

  return (
    <Form
      // Usamos handleSubmit de useForm para enviar los datos del formulario
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex gap-4 flex-column justify-content-center align-content-center"
    >
      <Row className="row-gap-4">
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicUserName">
            <Form.Label>{t("register.name")}*</Form.Label>
            <Form.Control
              // Usamos register de useForm para registrar los campos del formulario, si hay un error en el campo se añade la clase is-invalid que pone el borde del input en rojo
              className={`custom-input ${errors.user_name ? "is-invalid" : ""}`}
              // Usamos spread operator para pasar las propiedades del input al input
              {...register("user_name")}
              type="text"
              placeholder={t("register.namePlaceholder")}
            />
            {/* Si hay un error en el campo, mostramos el mensaje de error */}
            {errors.user_name && (
              <Form.Text className="text-danger">
                {errors.user_name.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicUserLastname">
            <Form.Label>{t("register.lastname")}*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.user_lastname ? "is-invalid" : ""
              }`}
              {...register("user_lastname")}
              type="text"
              placeholder={t("register.lastnamePlaceholder")}
            />
            {errors.user_lastname && (
              <Form.Text className="text-danger">
                {errors.user_lastname.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row className="row-gap-4">
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicTutorName">
            <Form.Label>{t("register.tutorName")}*</Form.Label>
            <Form.Control
              className={errors.user_tutor_name ? "is-invalid" : ""}
              {...register("user_tutor_name")}
              type="text"
              placeholder={t("register.tutorNamePlaceholder")}
            />
            {errors.user_tutor_name && (
              <Form.Text className="text-danger">
                {errors.user_tutor_name.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicTutorLastname">
            <Form.Label>{t("register.tutorLastname")}*</Form.Label>
            <Form.Control
              className={errors.user_tutor_lastname ? "is-invalid" : ""}
              {...register("user_tutor_lastname")}
              type="text"
              placeholder={t("register.tutorLastnamePlaceholder")}
            />
            {errors.user_tutor_lastname && (
              <Form.Text className="text-danger">
                {errors.user_tutor_lastname.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row className="row-gap-4">
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicDNI">
            <Form.Label>{t("register.dni")}*</Form.Label>
            <Form.Control
              className={errors.user_dni ? "is-invalid" : ""}
              {...register("user_dni")}
              type="text"
              placeholder={t("register.dniPlaceholder")}
            />
            {errors.user_dni && (
              <Form.Text className="text-danger">
                {errors.user_dni.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicCity">
            <Form.Label>{t("register.city")}*</Form.Label>
            <Form.Control
              className={errors.user_city ? "is-invalid" : ""}
              {...register("user_city")}
              type="text"
              placeholder={t("register.cityPlaceholder")}
            />
            {errors.user_city && (
              <Form.Text className="text-danger">
                {errors.user_city.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row className="row-gap-4">
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicAddress">
            <Form.Label>{t("register.address")}*</Form.Label>
            <Form.Control
              className={errors.user_address ? "is-invalid" : ""}
              {...register("user_address")}
              type="text"
              placeholder={t("register.addressPlaceholder")}
            />
            {errors.user_address && (
              <Form.Text className="text-danger">
                {errors.user_address.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicPhone">
            <Form.Label>{t("register.phone")}*</Form.Label>
            <Form.Control
              className={errors.user_phone ? "is-invalid" : ""}
              {...register("user_phone")}
              type="text"
              placeholder={t("register.phonePlaceholder")}
            />
            {errors.user_phone && (
              <Form.Text className="text-danger">
                {errors.user_phone.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row className="row-gap-4">
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicBirthDate">
            <Form.Label>{t("register.birthdate")}*</Form.Label>
            <Form.Control
              className={errors.user_birth_date ? "is-invalid" : ""}
              {...register("user_birth_date")}
              type="date"
            />
            {errors.user_birth_date && (
              <Form.Text className="text-danger">
                {errors.user_birth_date.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>{t("register.email")}*</Form.Label>
            <Form.Control
              className={errors.user_email ? "is-invalid" : ""}
              {...register("user_email")}
              type="email"
              placeholder={t("register.emailPlaceholder")}
            />
            {errors.user_email && (
              <Form.Text className="text-danger">
                {errors.user_email.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row className="row-gap-4">
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>{t("register.password")}*</Form.Label>
            <Form.Control
              className={errors.user_password ? "is-invalid" : ""}
              {...register("user_password")}
              type="password"
              placeholder={t("register.passwordPlaceholder")}
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
            <Form.Label>{t("register.confirmPassword")}*</Form.Label>
            <Form.Control
              className={errors.user_confirm_password ? "is-invalid" : ""}
              {...register("user_confirm_password")}
              type="password"
              placeholder={t("register.confirmPasswordPlaceholder")}
            />
            {errors.user_confirm_password && (
              <Form.Text className="text-danger">
                {errors.user_confirm_password.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicCenter">
            <Form.Label>{t("register.center")}*</Form.Label>
            <Form.Select
              className={errors.user_center_id ? "is-invalid" : ""}
              {...register("user_center_id")}
            >
              <option value="">{t("register.centerSelect")}</option>
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
        {/* Nuestro botton custom le podemos pasar las props 
        para reutilizarlo en este caso es type submit */}
        <ButtonCustom type={"submit"} bgColor={"orange"}>
          {authenticating ? t("register.registering") : t("register.registerButton")}
        </ButtonCustom>
      </div>
    </Form>
  );
}
