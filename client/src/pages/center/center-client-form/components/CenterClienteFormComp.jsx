import { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import "./CenterClienteFormComp.css";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
const initialValues = {
  center_city: "",
  center_province: "",
  center_address: "",
  center_phone: "",
  center_auth_doc: "",
};

export default function CenterClientFormComp() {
  const [formData, setFormData] = useState(initialValues);
  const [centerId, setCenterId] = useState(null);
  const params = useParams();

  const {register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: initialValues
  })


  useEffect(() => {
    const token = params.registerToken;
    console.log(token)
    if(token) {
      verifyToken(token);
    }
  }, [])


  const verifyToken = async (token) => {
    try {
      const response = await fetchData(`api/admin/centers/verifyToken/${token}`, "get");
      console.log(response);
      setCenterId(response.center_id)
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await fetchData(`api/user/completeCenter/${centerId}`, "put", formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form className="d-flex gap-4 flex-column justify-content-center align-content-center">
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Localidad*</Form.Label>
            <Form.Control
              className="custom-input"
              onChange={handleChange}
              value={formData.center_city}
              type="text"
              name="center_city"
              placeholder="Nombre de la localidad"
            />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Región*</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="center_province"
              value={formData.center_province}
              placeholder="Zona de la localidad"
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
              value={formData.center_address}
              type="text"
              name="center_address"
              placeholder="Dirección del centro"
            />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nº de Teléfono*</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="center_phone"
              value={formData.center_phone}
              placeholder="Número del centro"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Documento de Autorización*</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.center_auth_doc}
              type="text"
              name="center_auth_doc"
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
