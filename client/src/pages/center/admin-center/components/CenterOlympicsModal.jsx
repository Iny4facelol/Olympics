import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { toast, Toaster } from "sonner";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../../../core/context/AppContext";

export default function CenterOlympicsModal({ handleClose, show, data }) {
  const { themeSwitcher } = useAppContext();
  const [authenticating, setAuthenticating] = useState(false);
  const [olympics, setOlympics] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      olympics_id: "", // Cambiado a string vacío para radio button
    },
  });

  useEffect(() => {
    const fetchExistingOlympics = async () => {
      if (data) {
        try {
          const response = await fetchData(
            `api/admin/centerOlympics/${data.center_id}`,
            "get"
          );
          // Tomamos solo el primer valor ya que es radio button
          const existingOlympicsId = response[0]?.olympics_id.toString() || "";

          reset({
            olympics_id: existingOlympicsId,
          });
        } catch (error) {
          console.error("Error en el fetch de olimpiadas", error);
        }
      }
    };

    fetchExistingOlympics();
  }, [data, reset]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData("api/admin/allOlympics", "get");
        setOlympics(response);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const onSubmit = async (formData) => {
    try {
      setAuthenticating(true);
      const response = await fetchData(
        `api/admin/centerOlympics/${data.center_id}`,
        "get"
      );

      const existingOlympicsIds = response.map(
        (olympics) => olympics.olympics_id
      );

      // Para radio buttons, tratamos el valor único
      const selectedOlympicId = formData.olympics_id;
      const olympicsToDelete = existingOlympicsIds.filter(
        (id) => id.toString() !== selectedOlympicId
      );

      const dataToBackend = {
        olympics_id: [selectedOlympicId], // Envuelto en array para mantener compatibilidad
        olympics_id_to_delete: olympicsToDelete,
      };

      await fetchData(
        `api/admin/addOlympicsToCenter/${data.center_id}`,
        "post",
        dataToBackend
      );

      toast.success("Olimpiada asignada correctamente");
      setTimeout(() => {
        setAuthenticating(false);
        handleClose();
      }, 2000);
    } catch (error) {
      setAuthenticating(false);
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header
        className={themeSwitcher ? "" : "bg-dark text-white"}
        closeButton
      >
        <Modal.Title>Añadir olimpiada a {data.center_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={themeSwitcher ? "" : "bg-dark text-white"}>
        <p className="fst-italic">
          Seleccione una olimpiada para asignar a este centro.
        </p>
        <Form
          className="d-flex gap-4 flex-column justify-content-center align-content-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Row className="row-gap-4">
            <Col md={6} sm={12}>
              <Form.Group controlId="formBasicOlympics">
                <Form.Label className="fw-bold">Nombre de Olimpiada</Form.Label>
                {olympics.slice(0, 10).map((olympic) => (
                  <Col key={olympic.olympics_id}>
                    <Form.Check
                      value={olympic.olympics_id}
                      type="radio"
                      label={olympic.olympics_name}
                      {...register("olympics_id", {
                        required: "Debe seleccionar una olimpiada",
                      })}
                    />
                  </Col>
                ))}
              </Form.Group>
              {errors.olympics_id && (
                <Form.Text className="text-danger">
                  {errors.olympics_id.message}
                </Form.Text>
              )}
            </Col>
            <Col md={6} sm={12}>
              <Form.Group controlId="formBasicOlympics">
                <Form.Label>*</Form.Label>
                {olympics.slice(10, 20).map((olympic) => (
                  <Col key={olympic.olympics_id}>
                    <Form.Check
                      value={olympic.olympics_id}
                      type="radio"
                      label={olympic.olympics_name}
                      {...register("olympics_id", {
                        required: "Debe seleccionar una olimpiada",
                      })}
                    />
                  </Col>
                ))}
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex flex-column">
            <Toaster richColors position="top-center" />
            <div>
              <ButtonCustom type={"submit"} bgColor={"orange"}>
                {authenticating ? "Actualizando..." : "Aceptar"}
              </ButtonCustom>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
