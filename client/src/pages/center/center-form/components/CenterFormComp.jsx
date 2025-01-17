import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { fetchData } from "../../../../utils/axios/axiosHelper";

const initialValues = {
  center_name: "",
  center_email: "",
};

export default function FormComp() {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await fetchData(`api/admin/addCenter`, "post", formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form className="d-flex gap-4 flex-column justify-content-center align-content-center">
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nombre del centro</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="center_name"
              value={formData.center_name}
              placeholder="IES Ribalta"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.center_email}
              type="email"
              name="center_email"
              placeholder="Email del centro"
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
