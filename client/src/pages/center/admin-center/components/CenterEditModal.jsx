import { Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { centerSchema, editCenterSchema } from "../../../../utils/zodSchemas/centerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import ButtonCustom from "../../../../core/components/Button/Button";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/axios/axiosHelper";

function CenterEditModal({ handleClose, handleShow, show, data }) {
  const [authenticating, setAuthenticating] = useState(false);
  const [file, setFile] = useState(null);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editCenterSchema),
    defaultValues: {
      center_id: "",
      center_name: "",
      center_email: "",
      center_city: "",
      center_province: "",
      center_address: "",
      center_phone: "",
      center_auth_doc: null,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        center_id: data.center_id,
        center_name: data.center_name,
        center_email: data.center_email,
        center_city: data.center_city,
        center_province: data.center_province,
        center_address: data.center_address,
        center_phone: data.center_phone,
        center_auth_doc: data.center_phone,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    try {
      setAuthenticating(true);
      const dataWithId = {
        center_id: data.center_id,
        ...formData,
      };
      await fetchData(`api/admin/editCenter`, "put", dataWithId);
      toast.success("Centro actualizado correctamente");
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
        <Modal.Header closeButton>
          <Modal.Title>Editar Centro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="d-flex gap-4 flex-column justify-content-center align-content-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row className="row-gap-4">
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicCenterName">
                  <Form.Label>Nombre del centro*</Form.Label>
                  <Form.Control
                    className={`custom-input ${
                      errors.center_name ? "is-invalid" : ""
                    }`}
                    {...register("center_name")}
                    type="text"
                    placeholder="Nombre centro"
                  />
                </Form.Group>
                {errors.center_name && (
                  <Form.Text className="text-danger">
                    {errors.center_name.message}
                  </Form.Text>
                )}
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicCenterEMail">
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
                    className={`custom-input ${
                      errors.center_email ? "is-invalid" : ""
                    }`}
                    {...register("center_email")}
                    type="text"
                    placeholder="Email"
                  />
                </Form.Group>
                {errors.center_email && (
                  <Form.Text className="text-danger">
                    {errors.center_email.message}
                  </Form.Text>
                )}
              </Col>
            </Row>
            <Row className="row-gap-4">
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicOlympicsCenterCity">
                  <Form.Label>Localidad*</Form.Label>
                  <Form.Control
                    className={`custom-input ${
                      errors.center_city ? "is-invalid" : ""
                    }`}
                    {...register("center_city")}
                    type="text"
                    placeholder="Localidad"
                  />
                </Form.Group>
                {errors.center_city && (
                  <Form.Text className="text-danger">
                    {errors.center_city.message}
                  </Form.Text>
                )}
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicOlympicsHostAddress">
                  <Form.Label>Región*</Form.Label>
                  <Form.Control
                    className={`custom-input ${
                      errors.center_province ? "is-invalid" : ""
                    }`}
                    {...register("center_province")}
                    type="text"
                    placeholder="Zona de la localidad"
                  />
                </Form.Group>
                {errors.center_province && (
                  <Form.Text className="text-danger">
                    {errors.center_province.message}
                  </Form.Text>
                )}
              </Col>
            </Row>
            <Row className="row-gap-4">
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicCenterAddress">
                  <Form.Label>Dirección*</Form.Label>
                  <Form.Control
                    className={`custom-input ${
                      errors.center_address ? "is-invalid" : ""
                    }`}
                    {...register("center_address")}
                    type="text"
                    placeholder="Dirección del centro"
                  />
                </Form.Group>
                {errors.center_address && (
                  <Form.Text className="text-danger">
                    {errors.center_address.message}
                  </Form.Text>
                )}
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicCenterPhone">
                  <Form.Label>Nº de Teléfono*</Form.Label>
                  <Form.Control
                    className={`custom-input ${
                      errors.center_phone ? "is-invalid" : ""
                    }`}
                    {...register("center_phone")}
                    type="text"
                    placeholder="Número del centro"
                  />
                </Form.Group>
                {errors.center_phone && (
                  <Form.Text className="text-danger">
                    {errors.center_phone.message}
                  </Form.Text>
                )}
              </Col>
            </Row>
            <Row>
              <Col md={12} sm={12}>
                <Form.Group controlId="formBasicOlympicsDesc">
                  <Form.Label>Documento de Autorización*</Form.Label>
                  <Form.Control
                    className={`custom-input ${
                      errors.center_auth_doc ? "is-invalid" : ""
                    }`}
                    type="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </Form.Group>
                {errors.center_auth_doc && (
                  <Form.Text className="text-danger">
                    {errors.center_auth_doc.message}
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
                {authenticating ? "Actualizando..." : "Actualizar centro"}
              </ButtonCustom>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CenterEditModal;
