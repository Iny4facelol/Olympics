import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { useAppContext } from "../../../../core/context/AppContext";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";

export default function AsignActivityModal({ show, handleClose, data }) {
  const { user, themeSwitcher } = useAppContext();
  const [authenticating, setAuthenticating] = useState(false);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

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

  // Efecto para cargar datos solo cuando el modal se abre y no se han cargado antes
  useEffect(() => {
    const loadData = async () => {
      if (!show || !data?.olympics_id || !data?.user_id || hasLoaded) return;

      setIsLoading(true);
      try {
        // Cargar actividades de la olimpiada
        const olympicsActivities = await fetchData(
          `api/user/activitiesFromOlympics/${data.olympics_id}`,
          "get"
        );
        setActivities(olympicsActivities);

        // Cargar actividades del usuario
        const userActivitiesResponse = await fetchData(
          `api/user/userActivities/${data.user_id}/${data.olympics_id}`,
          "get"
        );

        // Mapear solo los IDs de las actividades del usuario
        const userActivityIds = userActivitiesResponse.map((activity) =>
          activity.activity_id.toString()
        );

        // Resetear el formulario con las actividades del usuario
        reset({ activity_id: userActivityIds });

        setHasLoaded(true);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        toast.error("Error al cargar las actividades");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [show, data?.olympics_id, data?.user_id]);

  // Reset hasLoaded when modal closes
  useEffect(() => {
    if (!show) {
      setHasLoaded(false);
    }
  }, [show]);

  const onSubmit = async (formData) => {
    if (!data?.olympics_id || !data?.user_id) {
      toast.error("Datos incompletos");
      return;
    }

    try {
      setAuthenticating(true);

      const dataToBackend = {
        activity_id: formData.activity_id,
        center_id: user.user_center_id,
        olympics_id: data.olympics_id,
      };

      await fetchData(
        `api/user/addActivityToUser/${data.user_id}`,
        "post",
        dataToBackend
      );

      toast.success("Actividades actualizadas correctamente");
      setHasLoaded(false); // Reset hasLoaded para permitir recargar en la próxima apertura
      setTimeout(() => {
        setAuthenticating(false);
        handleClose();
      }, 2000);
    } catch (error) {
      setAuthenticating(false);
      toast.error("Error al asignar actividades");
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header
        className={themeSwitcher ? "" : "bg-dark text-white"}
        closeButton
      >
        <Modal.Title>
          {data?.user_name
            ? `Asignar actividad a ${data.user_name}`
            : "Asignar actividad"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={themeSwitcher ? "" : "bg-dark text-white"}>
        <p className="fst-italic">
          Para eliminar las actividades asignadas a este alumno, simplemente
          desmárquelas.
        </p>
        {isLoading ? (
          <div className="text-center">Cargando actividades...</div>
        ) : (
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
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicActivities2">
                  <Form.Label>&nbsp;</Form.Label>
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
              </Col>
            </Row>
            <div className="d-flex flex-column">
              <div>
                <ButtonCustom type="submit" bgColor="orange">
                  {authenticating ? "Actualizando..." : "Actualizar"}
                </ButtonCustom>
              </div>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}
