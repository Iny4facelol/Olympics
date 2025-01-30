import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { toast, Toaster } from "sonner";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useAppContext } from "../../../../core/context/AppContext";

export default function AuthModal({ show, handleClose, handleShow, data }) {
  const { themeSwitcher } = useAppContext();
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
        <Modal.Header
          className={themeSwitcher ? "" : "bg-dark text-white"}
          closeButton
        >
          <Modal.Title>¿Deseas autorizar a {data.user_name}?</Modal.Title>
        </Modal.Header>
        <Modal.Body className={themeSwitcher ? "" : "bg-dark text-white"}>
          <p className="fs-5 fw-bold m-0">
            Aquí confirmas que has comprobado la autorización de{" "}
            {data.user_name} para acceder a la plataforma.
          </p>
          <div className="mt-4 d-flex gap-2">
            <ButtonCustom onClick={handleAuthUser} bgColor={"orange"}>
              {authenticating ? "Denegando..." : "Aceptar"}
            </ButtonCustom>
            <ButtonCustom onClick={handleClose} bgColor={"orange"}>
              Cancelar
            </ButtonCustom>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
