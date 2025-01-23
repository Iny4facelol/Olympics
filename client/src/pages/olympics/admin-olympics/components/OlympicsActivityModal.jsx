import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { olympicsSchema } from "../../../../utils/zodSchemas/olympicsSchema";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { toast, Toaster } from "sonner";
import ButtonCustom from "../../../../core/components/Button/Button";

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
      activity_id: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        activity_id: "",
      });
    }
  }, [data, reset]);

  useEffect(() => {
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
      console.log(formData);
      
      setAuthenticating(true);
      const dataWithId = {
        olympics_id: data.olympics_id,
        ...formData,
      };
      await fetchData(`api/admin/acivity/${data.olympics_id}`, "put", dataWithId);
      toast.success("Actividades añadidas correctamente");
      setTimeout(() => {
        setAuthenticating(false);
        handleClose();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir actividades a {data.olympics_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <div className="">
            <Toaster richColors position="top-center" />
            <ButtonCustom type={"submit"} bgColor={"orange"}>
              {authenticating ? "Añadiendo..." : "Añadir"}
            </ButtonCustom>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
