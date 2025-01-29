import React, { useState } from "react";
import { emailSchema } from "../../../../../../server/utils/zodSchemas/userSchema";
import { Col, Form, Row } from "react-bootstrap";
import { toast, Toaster } from "sonner";
import ButtonCustom from "../../../../core/components/Button/Button";
import { useForm } from "react-hook-form";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

export const ForgotPasswordForm = ({setShowForgotPassword}) => {
  const [authenticating, setAuthenticating] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState();  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      user_email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setAuthenticating(true);
      setShowForgotPassword(false);
      await fetchData(`api/user/findUserByEmail`, "post", data);
      toast.success("Email enviado");
      setEmailErrorMsg();
      setTimeout(() => {
        setAuthenticating(false);
        navigate("/user/login");
      }, 2000);
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        setAuthenticating(false);
        setEmailErrorMsg(error.response.data.emailError);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicUserEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              className={`custom-input ${
                errors.user_email ? "is-invalid" : ""
              }`}
              {...register("user_email")}
              type="text"
              placeholder="Email"
            />
          </Form.Group>
          {emailErrorMsg && (
            <Form.Text className="text-danger">{emailErrorMsg}</Form.Text>
          )}
          {errors.user_email && (
            <Form.Text className="text-danger">
              {errors.user_email.message}
            </Form.Text>
          )}
        </Col>
      </Row>

      <div className="mt-4">
        <Toaster richColors position="top-center" />
        <ButtonCustom type={"submit"} bgColor={"orange"}>
          {authenticating ? "Enviando..." : "Enviar"}
        </ButtonCustom>
      </div>
    </Form>
  );
};
