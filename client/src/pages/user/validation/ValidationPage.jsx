import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import AppLayout from "../../../core/layout/AppLayout";
import { Medal } from "lucide-react";
import { fetchData } from "../../../utils/axios/axiosHelper";
import { useParams } from "react-router-dom";

export default function ValidationPage() {
  const params = useParams();

  useEffect(() => {
    const token = params.validationToken;
    if (token) {
      verifyToken(token);
    }
  }, []);

  useEffect(() => {
    const sendToken = async () => {
      try {
        const response = await fetchData(
          `api/user/validateRegistrationUser/${params.validationToken}`,
          "put"
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    sendToken();
  }, [])

  const verifyToken = async (token) => {
    try {
      const response = await fetchData(
        `api/admin/verifyTokenResponsible/${token}`,
        "get"
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppLayout>
      <Container className="d-flex align-content-center justify-content-center flex-column">
        <h2 className="fs-1">
          Su cuenta ha sido{" "}
          <span className="custom-span">validada con éxito</span>,
        </h2>
        <h3 className="fs-1">
          <span className="custom-span">bienvenido</span> a Olympics Sports.{" "}
          <Medal size={32} />
        </h3>
      </Container>
    </AppLayout>
  );
}
