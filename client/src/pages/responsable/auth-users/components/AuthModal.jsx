import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { toast, Toaster } from "sonner";
import { fetchData } from "../../../../utils/axios/axiosHelper";

export default function AuthModal({ show, handleClose, handleShow, data }) {
  const [authenticating, setAuthenticating] = useState(false);

  const handleAuthUser = async () => {
    try {
      toast.success("Autorización concedida");
      setAuthenticating(true);
      await fetchData(`api/user/authUser/${data.user_id}`, "put");
      setTimeout(() => {
        setAuthenticating(false);
        handleClose();
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>¿Deseas autorizar a {data.user_name}?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fs-5 fw-bold m-0">
            Aquí confirmas que has comprobado la autorización de{" "}
            {data.user_name} para acceder a la plataforma.
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          <Toaster richColors position="top-center" />
          <ButtonCustom onClick={handleAuthUser} bgColor={"orange"}>
            {authenticating ? "Autorizando..." : "Aceptar"}
          </ButtonCustom>
          <ButtonCustom onClick={handleClose} bgColor={"orange"}>Cancelar</ButtonCustom>
        </Modal.Footer>
      </Modal>
    </>
  );
}
