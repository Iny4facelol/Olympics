import { Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { editActivitySchema } from "../../../../utils/zodSchemas/activitySchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import ButtonCustom from "../../../../core/components/Button/Button";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/axios/axiosHelper";

function ActivityEditModal({ handleClose, handleShow, show, data }) {
  const [authenticating, setAuthenticating] = useState(false);
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editActivitySchema),
    defaultValues: {
      activity_id: "",
      activity_name: "",
      activity_description: "",
      max_participants: "",
      activity_image: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        activity_id: data.activity_id,
        activity_name: data.activity_name,
        activity_description: data.activity_description,
        max_participants: data.max_participants,
        activity_image: data.activity_image
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    try {
      setAuthenticating(true);
      const dataWithId = {
        activity_id: data.activity_id,
        ...formData,
      };
      await fetchData(`api/admin/editActivity`, "put", dataWithId);
      toast.success("Actividad actualizada correctamente");
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
          <Modal.Title>Editar Actividad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="d-flex gap-4 flex-column justify-content-center align-content-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row className="row-gap-4">
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicActivityName">
                  <Form.Label>Nombre de la Actividad*</Form.Label>
                  <Form.Control
                    className={`custom-input ${
                      errors.activity_name ? "is-invalid" : ""
                    }`}
                    {...register("activity_name")}
                    type="text"
                    placeholder="Nombre Actividad"
                  />
                </Form.Group>
                {errors.activity_name && (
                  <Form.Text className="text-danger">
                    {errors.activity_name.message}
                  </Form.Text>
                )}
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicActivityDescription">
                  <Form.Label>Descripción de la actividad*</Form.Label>
                  <Form.Control
                    className={`custom-input ${
                      errors.activity_description ? "is-invalid" : ""
                    }`}
                    {...register("activity_description")}
                    type="text"
                    placeholder="Descripción de la actividad"
                  />
                </Form.Group>
                {errors.activity_description && (
                  <Form.Text className="text-danger">
                    {errors.activity_description.message}
                  </Form.Text>
                )}
              </Col>
            </Row>
            <Row className="row-gap-4">
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicMaxParticipants">
                  <Form.Label>Nº de participantes*</Form.Label>
                  <Form.Control
                    className={`custom-input ${
                      errors.max_participants ? "is-invalid" : ""
                    }`}
                    {...register("max_participants", { valueAsNumber: true })}
                    type="number"
                    placeholder="Nº de participantes"
                  />
                </Form.Group>
                {errors.max_participants && (
                  <Form.Text className="text-danger">
                    {errors.max_participants.message}
                  </Form.Text>
                )}
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicActivityImage">
                  <Form.Label>Imagen de la actividad*</Form.Label>
                  <Form.Control
                    className={`custom-input ${
                      errors.activity_image ? "is-invalid" : ""
                    }`}
                    {...register("activity_image")}
                    type="file"
                    placeholder="Imagen actividad"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </Form.Group>
                {errors.activity_image && (
                  <Form.Text className="text-danger">
                    {errors.activity_image.message}
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
                {authenticating ? "Actualizando..." : "Actualizar Actividad"}
              </ButtonCustom>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ActivityEditModal;
