import { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import "./CenterClienteFormComp.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { centerSchema } from "../../../../utils/zodSchemas/centerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";

export default function CenterClientFormComp() {
  const [centerId, setCenterId] = useState(null);
  const [authenticating, setAuthenticating] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(centerSchema),
    defaultValues: {
      center_city: "",
      center_province: "",
      center_address: "",
      center_phone: "",
      center_auth_doc: null,
    },
  });

  useEffect(() => {
    const token = params.registerToken;
    console.log(token);
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetchData(
        `api/admin/centers/verifyToken/${token}`,
        "get"
      );
      console.log(response);
      setCenterId(response.center_id);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      setAuthenticating(true);
      toast.success("Centro creado correctamente");
      const formData = new FormData();
      formData.append("center_city", data.center_city);
      formData.append("center_province", data.center_province);
      formData.append("center_address", data.center_address);
      formData.append("center_phone", data.center_phone);
      
      if (file) {
        console.log(file);
        formData.append("file", file);
      }
      
      await fetchData(
        `api/user/completeCenter/${centerId}`,
        "put",
        formData
      );

      setTimeout(() => {
        setAuthenticating(false);
        navigate("/")
      }, 2000)

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className="d-flex gap-4 flex-column justify-content-center align-content-center"
    >
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicCity">
            <Form.Label>Localidad*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.center_city ? "is-invalid" : ""
              }`}
              {...register("center_city")}
              type="text"
              placeholder="Nombre de la localidad"
            />
            {errors.center_city && (
              <Form.Text className="text-danger">
                {errors.center_city.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicProvince">
            <Form.Label>Región*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.center_province ? "is-invalid" : ""
              }`}
              {...register("center_province")}
              type="text"
              placeholder="Zona de la localidad"
            />
            {errors.center_province && (
              <Form.Text className="text-danger">
                {errors.center_province.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicAddress">
            <Form.Label>Dirección*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.center_address ? "is-invalid" : ""
              }`}
              {...register("center_address")}
              type="text"
              placeholder="Dirección del centro"
            />
            {errors.center_address && (
              <Form.Text className="text-danger">
                {errors.center_address.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicPhone">
            <Form.Label>Nº de Teléfono*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.center_phone ? "is-invalid" : ""
              }`}
              {...register("center_phone")}
              type="text"
              placeholder="Número del centro"
            />
            {errors.center_phone && (
              <Form.Text className="text-danger">
                {errors.center_phone.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicAuthDoc">
            <Form.Label>Documento de Autorización*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.center_auth_doc ? "is-invalid" : ""
              }`}
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            {errors.center_auth_doc && (
              <Form.Text className="text-danger">
                {errors.center_auth_doc.message}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>

      <div>
        <Toaster richColors position="top-center" />
        <ButtonCustom type={"submit"} bgColor={"orange"}>
          {authenticating ? "Creando..." : "Crear centro"}
        </ButtonCustom>
      </div>
    </Form>
  );
}
