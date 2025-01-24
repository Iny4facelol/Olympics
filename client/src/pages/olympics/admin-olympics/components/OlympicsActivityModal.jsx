import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useForm } from "react-hook-form";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { toast, Toaster } from "sonner";
import ButtonCustom from "../../../../core/components/Button/Button";
import axios from "axios";

export default function OlympicsActivityModal({ handleClose, show, data }) {
  const [authenticating, setAuthenticating] = useState(false);
  const [activities, setActivities] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      activity_id: [],
    },
  });

  useEffect(() => {
    // fetch de las actividades para mostrarlas en el checkbox
    // como marcadas si ya están asignadas a la olimpiada
    const fetchExistingActivities = async () => {
      if (data) {
        try {
          const response = await fetchData(
            `api/admin/olympicsActivities/${data.olympics_id}`,
            "get"
          );
          const existingActivityIds = response.map((activity) =>
            activity.activity_id.toString()
          );

          reset({
            activity_id: existingActivityIds,
          });
        } catch (error) {
          console.error("Error en el fetch de actividades", error);
        }
      }
    };

    fetchExistingActivities();
  }, [data, reset]);

  useEffect(() => {
    // fetch de todas las actividades para mapearlas en el checkbox
    const getData = async () => {
      try {
        const response = await fetchData(`api/admin/allActivity`, "get");
        setActivities(response);
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
      // fetch de las actividades asignadas a la olimpiada
      const response = await fetchData(
        `api/admin/olympicsActivities/${data.olympics_id}`,
        "get"
      );
      // mapeo de las actividades asignadas a la olimpiada
      const existingOlympicsActivities = response.map(
        (activity) => activity.activity_id
      );
      // mapeo de las actividades seleccionadas en el checkbox
      const checkedActivities = formData.activity_id;

      // filtrado de las actividades que se han deseleccionado
      const uncheckedActivities = existingOlympicsActivities.filter(
        (activityId) => !checkedActivities.includes(String(activityId))
      );

      // objeto con las actividades seleccionadas y deseleccionadas
      const dataToBackend = {
        activity_id: checkedActivities,
        activity_id_to_delete: uncheckedActivities,
      };

      await fetchData(
        `api/admin/activity/${data.olympics_id}`,
        "post",
        dataToBackend
      );

      toast.success("Actividades añadidas correctamente");
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
        <Modal.Title>Añadir actividades a {data.olympics_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="fst-italic">
          Para eliminar las actividades asignadas a esta olimpiada, simplemente
          desmárquelas.
        </p>
        <Form
          className="d-flex gap-4 flex-column justify-content-center align-content-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Row className="row-gap-4">
            <Col md={6} sm={12}>
              <Form.Group controlId="formBasicActivities">
                <Form.Label>Nombre Actividad</Form.Label>
                {activities.slice(0, 10).map((activity) => (
                  <Col key={activity.activity_id}>
                    <Form.Check
                      value={activity.activity_id}
                      type="checkbox"
                      label={activity.activity_name}
                      {...register("activity_id")}
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
              <Form.Group controlId="formBasicActivities">
                <Form.Label>*</Form.Label>
                {activities.slice(10, 20).map((activity) => (
                  <Col key={activity.activity_id}>
                    <Form.Check
                      value={activity.activity_id}
                      type="checkbox"
                      label={activity.activity_name}
                      {...register("activity_id")}
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
                {authenticating ? "Añadiendo..." : "Añadir"}
              </ButtonCustom>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
