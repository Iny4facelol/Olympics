import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";

const initialValues = {
  user_name: "",
  user_lastname: "",
  user_tutor_name: "",
  user_tutor_lastname: "",
  user_dni: "",
  user_city: "",
  user_address: "",
  user_phone: "",
  user_birth_date: "",
  user_email: "",
  user_password: "",
  user_confirm_password: "",

}


export default function RegisterUserForm() {
  const [formData, setFormData] = useState(initialValues)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }


  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await fetchData(`api/user/register`, "post", formData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form className="d-flex gap-4 flex-column justify-content-center align-content-center">
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicUserName">
            <Form.Label>Nombre*</Form.Label>
            <Form.Control
              className="custom-input"
              onChange={handleChange}
              value={formData.user_name}
              type="text"
              name="user_name"
              placeholder="Nombre"
            />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicUserLastname">
            <Form.Label>Apellidos*</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="user_lastname"
              value={formData.user_lastname}
              placeholder="Apellidos"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicTutorName">
            <Form.Label>Nombre del tutor*</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.user_tutor_name}
              type="text"
              name="user_tutor_name"
              placeholder="Nombre del tutor"
            />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicTutorLastname">
            <Form.Label>Apellidos del tutor*</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="user_tutor_lastname"
              value={formData.user_tutor_lastname}
              placeholder="Apellidos del tutor"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>DNI*</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.user_dni}
              type="text"
              name="user_dni"
              placeholder="DNI"
            />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Localidad*</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="user_city"
              value={formData.user_city}
              placeholder="Nombre de la localidad"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Dirección*</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.user_address}
              type="text"
              name="user_address"
              placeholder="Dirección"
            />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nº de Teléfono*</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="user_phone"
              value={formData.user_phone}
              placeholder="Número de teléfono"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Fecha de Nacimiento*</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.user_birth_date}
              type="date"
              name="user_birth_date"
            />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="email"
              name="user_email"
              value={formData.user_email}
              placeholder="Email"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña*</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.user_password}
              type="password"
              name="user_password"
              placeholder="Contraseña"
            />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirmar Contraseña*</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.user_confirm_password}
              type="password"
              name="user_password"
              placeholder="Repite la contraseña"
            />
          </Form.Group>
        </Col>

      </Row>



      <div>
        <ButtonCustom onClick={onSubmit} bgColor={"orange"}>
          Crear
        </ButtonCustom>
      </div>
    </Form>
  );
}
