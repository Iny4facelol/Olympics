import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import ButtonCustom from '../../../../core/components/Button/Button';
import { toast, Toaster } from 'sonner';

export default function DenyModal({ show, handleClose, data }) {
  const [authenticating, setAuthenticating] = useState(false);

  const handleDenyAuthUser =  () => {
    setAuthenticating(true);
    toast.success("Autorización denegada");
    setTimeout(() => {
      setAuthenticating(false);
      handleClose();
    }, 1500);
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>¿Deseas denegar la autorización a {data.user_name}?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fs-5 fw-bold m-0">
            Aquí confirmas que has comprobado la autorización de{" "}
            {data.user_name} para acceder a la plataforma. Y no es válida.
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          <Toaster richColors position="top-center" />
          <ButtonCustom onClick={handleDenyAuthUser} bgColor={"orange"}>
            {authenticating ? "Denegando..." : "Aceptar"}
          </ButtonCustom>
          <ButtonCustom onClick={handleClose} bgColor={"orange"}>
            Cancelar
          </ButtonCustom>
        </Modal.Footer>
      </Modal>
    </>
  );
}
