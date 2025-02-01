import { Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { olympicsSchema } from "../../../../utils/zodSchemas/olympicsSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import ButtonCustom from "../../../../core/components/Button/Button";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useTranslation} from "react-i18next"
import { useAppContext } from "../../../../core/context/AppContext";


function OlympicsEditModal({ handleClose, handleShow, show, data }) {
  const { themeSwitcher } = useAppContext();
  const [authenticating, setAuthenticating] = useState(false);
  const {t} = useTranslation();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(olympicsSchema),
    defaultValues: {
      olympics_id: "",
      olympics_name: "",
      olympics_host_name: "",
      olympics_host_city: "",
      olympics_host_address: "",
      olympics_start_date: "",
      olympics_end_date: "",
      olympics_description: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        olympics_id: data.olympics_id,
        olympics_name: data.olympics_name,
        olympics_host_name: data.olympics_host_name,
        olympics_host_city: data.olympics_host_city,
        olympics_host_address: data.olympics_host_address,
        olympics_start_date: data.olympics_start_date,
        olympics_end_date: data.olympics_end_date,
        olympics_description: data.olympics_description,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    try {
      setAuthenticating(true);
      const dataWithId = {
        olympics_id: data.olympics_id,
        ...formData,
      };
      await fetchData(`api/admin/editOlympics`, "put", dataWithId);
      toast.success(t("olympics.olympicsSuccessfullyUpdated"));
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
          <Modal.Title>{t("olympics.editOlympicsTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={themeSwitcher ? "" : "bg-dark text-white"}>
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
                    placeholder={t("olympics.olympicsName")}
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
                    placeholder={t("olympics.olympicsHostName")}
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
                    placeholder={t("olympics.olympicsHostCity")}
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
                    placeholder={t("olympics.olympicsAddress")}
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
              <Col md={12} sm={12}>
                <Form.Group controlId="formBasicOlympicsDesc">
                  <Form.Label>{t("olympics.olympicsDescription")}</Form.Label>
                  <Form.Control
                    as={"textarea"}
                    className={`custom-input ${
                      errors.olympics_description ? "is-invalid" : ""
                    }`}
                    {...register("olympics_description")}
                    type="text"
                    placeholder={t("olympics.olympicsDescription")}
                  />
                </Form.Group>
                {errors.olympics_description && (
                  <Form.Text className="text-danger">
                    {errors.olympics_description.message}
                  </Form.Text>
                )}
              </Col>
            </Row>
            <div
              style={{ width: "100%", height: "2px", backgroundColor: "gray" }}
            ></div>
            <div className="">
              <Toaster richColors position="top-center" />
              <ButtonCustom type={"submit"} bgColor={"orange"}>
                {authenticating
                  ? t("olympics.updatingButton")
                  : t("olympics.updateButton")}
              </ButtonCustom>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OlympicsEditModal;
