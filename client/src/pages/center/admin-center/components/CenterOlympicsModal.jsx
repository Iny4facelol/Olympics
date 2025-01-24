import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { toast, Toaster } from "sonner";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useForm } from "react-hook-form";

export default function CenterOlympicsModal({ handleClose, show, data }) {
  const [authenticating, setAuthenticating] = useState(false);
  const [olympics, setOlympics] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      olympics_id: [],
    },
  });

  useEffect(() => {
    // fetch de las olimpiadas para mostrarlas en el checkbox
    // como marcadas si ya están asignadas al centro
    const fetchExistingOlympics = async () => {
      if (data) {
        try {
          const response = await fetchData(
            `api/admin/centerOlympics/${data.center_id}`,
            "get"
          );
          console.log(response);
          const existingOlympicsIds = response.map((olympics) =>
            olympics.olympics_id.toString()
          );

          reset({
            olympics_id: existingOlympicsIds,
          });
        } catch (error) {
          console.error("Error en el fetch de olimpiadas", error);
        }
      }
    };

    fetchExistingOlympics();
  }, [data, reset]);

  useEffect(() => {
    // fetch de todas las olimpiadas para mostrarlas en el checkbox
    const getData = async () => {
      try {
        const response = await fetchData("api/admin/allOlympics", "get");
        setOlympics(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const onSubmit = async (formData) => {
    try {
      setAuthenticating(true);
      // fetch de las olimpiadas asignadas al centro
      const response = await fetchData(
        `api/admin/centerOlympics/${data.center_id}`,
        "get"
      );
      // mapeo de las Olimpiadas asignadas al centro
      const existingCenterOlympics = response.map(
        (olympics) => olympics.olympics_id
      );
      // mapeo de las Olimpiadas seleccionadas en el checkbox
      const checkedOlympics = formData.olympics_id;

      // filtrado de las Olimpiadas que se han deseleccionado
      const uncheckedOlympics = existingCenterOlympics.filter(
        (olympicsId) => !checkedOlympics.includes(String(olympicsId))
      );

      // objeto con las Olimpiadas seleccionadas y deseleccionadas
      const dataToBackend = {
        olympics_id: checkedOlympics,
        olympics_id_to_delete: uncheckedOlympics,
      };

      await fetchData(
        `api/admin/addOlympicsToCenter/${data.center_id}`,
        "post",
        dataToBackend
      );

      toast.success("Olimpiadas añadidas correctamente");
      setTimeout(() => {
        setAuthenticating(false);
        handleClose();
      }, 2000);
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        setAuthenticating(false);
        console.error(error);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir olimpiadas a {data.center_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="fst-italic">
          Para eliminar las olimpiadas asignadas a este centro, simplemente
          desmárquelas.
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
                      type="checkbox"
                      label={olympic.olympics_name}
                      {...register("olympics_id")}
                    />
                  </Col>
                ))}
              </Form.Group>
              {errors.activity_id && (
                <Form.Text className="text-danger">
                  {errors.activity_id.message}
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
                      type="checkbox"
                      label={olympic.olympics_name}
                      {...register("olympics_id")}
                    />
                  </Col>
                ))}
              </Form.Group>
              {errors.activity_id && (
                <Form.Text className="text-danger">
                  {errors.activity_id.message}
                </Form.Text>
              )}
            </Col>
          </Row>
          <div
            style={{ width: "100%", height: "1px", backgroundColor: "gray" }}
          ></div>
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
