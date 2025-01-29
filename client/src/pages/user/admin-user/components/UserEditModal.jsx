import { Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { editUserSchema } from "../../../../utils/zodSchemas/registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import ButtonCustom from "../../../../core/components/Button/Button";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useAppContext } from "../../../../core/context/AppContext";

function UserEditModal({ handleClose, show, data }) {
  const {themeSwitcher} = useAppContext();
  const [authenticating, setAuthenticating] = useState(false);
  const [centerList, setCenterList] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      user_id: "",
      user_name: "",
      user_lastname: "",
      user_tutor_name: "",
      user_tutor_lastname: "",
      user_dni: "",
      user_city: "",
      user_address: "",
      user_birth_date: "",
      user_phone: "",
      user_center_id: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        user_id: data.user_id,
        user_name: data.user_name,
        user_lastname: data.user_lastname,
        user_tutor_name: data.user_tutor_name,
        user_tutor_lastname: data.user_tutor_lastname,
        user_dni: data.user_dni,
        user_city: data.user_city,
        user_address: data.user_address,
        user_birth_date: data.user_birth_date,
        user_phone: data.user_phone,
        user_center_id: data.user_center_id,
      });
    }
  }, [data, reset]);

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
      const dataWithId = {
        user_id: data.user_id,
        ...formData,
      };
      await fetchData(`api/admin/editUser`, "put", dataWithId);
      toast.success("Usuario actualizado correctamente");
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
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body className={themeSwitcher ? "" : "bg-dark text-white"}>
          <Form
            className="d-flex gap-4 flex-column justify-content-center align-content-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row className="row-gap-4">
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicUserName">
                  <Form.Label>Nombre*</Form.Label>
                  <Form.Control
                    className={`custom-input ${
                      errors.user_name ? "is-invalid" : ""
                    }`}
                    {...register("user_name")}
                    type="text"
                    placeholder="Nombre"
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
                  <Form.Label>Apellidos*</Form.Label>
                  <Form.Control
                    className={`custom-input ${
                      errors.user_lastname ? "is-invalid" : ""
                    }`}
                    {...register("user_lastname")}
                    type="text"
                    placeholder="Apellidos"
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
                <Form.Group controlId="formBasicTutorName">
                  <Form.Label>Nombre del tutor*</Form.Label>
                  <Form.Control
                    className={errors.user_tutor_name ? "is-invalid" : ""}
                    {...register("user_tutor_name")}
                    type="text"
                    placeholder="Nombre del tutor"
                  />
                </Form.Group>
                {errors.user_tutor_name && (
                  <Form.Text className="text-danger">
                    {errors.user_tutor_name.message}
                  </Form.Text>
                )}
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicTutorLastname">
                  <Form.Label>Apellidos del tutor*</Form.Label>
                  <Form.Control
                    className={errors.user_tutor_lastname ? "is-invalid" : ""}
                    {...register("user_tutor_lastname")}
                    type="text"
                    placeholder="Apellidos del tutor"
                  />
                </Form.Group>
                {errors.user_tutor_lastname && (
                  <Form.Text className="text-danger">
                    {errors.user_tutor_lastname.message}
                  </Form.Text>
                )}
              </Col>
            </Row>
            <Row className="row-gap-4">
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicDNI">
                  <Form.Label>DNI*</Form.Label>
                  <Form.Control
                    className={errors.user_dni ? "is-invalid" : ""}
                    {...register("user_dni")}
                    type="text"
                    placeholder="DNI"
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
                  <Form.Label>Localidad*</Form.Label>
                  <Form.Control
                    className={errors.user_city ? "is-invalid" : ""}
                    {...register("user_city")}
                    type="text"
                    placeholder="Nombre de la localidad"
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
                  <Form.Label>Dirección*</Form.Label>
                  <Form.Control
                    className={errors.user_address ? "is-invalid" : ""}
                    {...register("user_address")}
                    type="text"
                    placeholder="Dirección"
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
                  <Form.Label>Nº de Teléfono*</Form.Label>
                  <Form.Control
                    className={errors.user_phone ? "is-invalid" : ""}
                    {...register("user_phone")}
                    type="text"
                    placeholder="Número de teléfono"
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
                  <Form.Label>Fecha de Nacimiento*</Form.Label>
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
                <Form.Group controlId="formBasicCenter">
                  <Form.Label>Centro*</Form.Label>
                  <Form.Select
                    className={errors.user_center_id ? "is-invalid" : ""}
                    {...register("user_center_id")}
                  >
                    <option value="">Selecciona un centro</option>
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
            <div className="">
              <Toaster richColors position="top-center" />
              <ButtonCustom type={"submit"} bgColor={"orange"}>
                {authenticating ? "Actualizando..." : "Actualizar Usuario"}
              </ButtonCustom>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserEditModal;
