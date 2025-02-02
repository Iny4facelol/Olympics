import { Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { editResponsibleSchema } from "../../../../utils/zodSchemas/registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import ButtonCustom from "../../../../core/components/Button/Button";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useAppContext } from "../../../../core/context/AppContext";
import { useTranslation } from "react-i18next";

function ResponsibleEditModal({ handleClose, show, data }) {
  const { user, themeSwitcher } = useAppContext();
  const [authenticating, setAuthenticating] = useState(false);
  const [centerList, setCenterList] = useState([]);
  const editUser = { ...user };
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editResponsibleSchema),
    defaultValues: {
      user_id: "",
      user_name: "",
      user_lastname: "",
      user_dni: "",
      user_city: "",
      user_phone: "",
      user_center_id: "",
    },
  });

  useEffect(() => {
    if (editUser) {
      reset({
        user_id: editUser.user_id,
        user_name: editUser.user_name,
        user_lastname: editUser.user_lastname,
        user_dni: editUser.user_dni,
        user_city: editUser.user_city,
        user_phone: editUser.user_phone,
        user_center_id: editUser.user_center_id,
      });
    }
  }, [user, reset]);

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

  const onSubmit = async (formData) => {
    try {
      setAuthenticating(true);
      await fetchData(`api/user/editResponsible/${data}`, "put", formData);
      toast.success(t("responsible.toastEditMessage"));
      setTimeout(() => {
        setAuthenticating(false);
        handleClose();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          className={themeSwitcher ? "" : "bg-dark text-white"}
          closeButton
        >
          <Modal.Title>{t("responsible.modalEditTittle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={themeSwitcher ? "" : "bg-dark text-white"}>
          <Form
            className="d-flex gap-4 flex-column justify-content-center align-content-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row className="row-gap-4">
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicUserName">
                  <Form.Label>{t("responsible.name")}*</Form.Label>
                  <Form.Control
                    className={`custom-input ${
                      errors.user_name ? "is-invalid" : ""
                    }`}
                    {...register("user_name")}
                    type="text"
                    placeholder={t("responsible.name")}
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
                  <Form.Label>{t("responsible.lastname")}*</Form.Label>
                  <Form.Control
                    className={`custom-input ${
                      errors.user_lastname ? "is-invalid" : ""
                    }`}
                    {...register("user_lastname")}
                    type="text"
                    placeholder={t("responsible.lastname")}
                  />
                </Form.Group>
                {errors.user_lastname && (
                  <Form.Text className="text-danger">
                    {errors.user_lastname.message}
                  </Form.Text>
                )}
              </Col>
            </Row>
            <Row className="row-gap-4">
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicDNI">
                  <Form.Label>{t("responsible.respDni")}*</Form.Label>
                  <Form.Control
                    className={errors.user_dni ? "is-invalid" : ""}
                    {...register("user_dni")}
                    type="text"
                    placeholder={t("responsible.respDniPlaceholder")}
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
                  <Form.Label>{t("responsible.city")}*</Form.Label>
                  <Form.Control
                    className={errors.user_city ? "is-invalid" : ""}
                    {...register("user_city")}
                    type="text"
                    placeholder={t("responsible.city")}
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
                <Form.Group controlId="formBasicPhone">
                  <Form.Label>{t("responsible.respPhone")}*</Form.Label>
                  <Form.Control
                    className={errors.user_phone ? "is-invalid" : ""}
                    {...register("user_phone")}
                    type="text"
                    placeholder={t("responsible.respPhonePlaceholder")}
                  />
                  {errors.user_phone && (
                    <Form.Text className="text-danger">
                      {errors.user_phone.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicCenter">
                  <Form.Label>{t("responsible.center")}*</Form.Label>
                  <Form.Select
                    className={errors.user_center_id ? "is-invalid" : ""}
                    {...register("user_center_id")}
                  >
                    <option value="">{t("responsible.selectCenter")}</option>
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
              <Toaster richColors position="top-center" />
              <ButtonCustom type={"submit"} bgColor={"orange"}>
                {authenticating ? t("responsible.updatingButton") : t("responsible.updateButton")}
              </ButtonCustom>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ResponsibleEditModal;
