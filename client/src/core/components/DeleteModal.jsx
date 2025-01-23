import { Modal } from "react-bootstrap";
import ButtonCustom from "./Button/Button";
import { fetchData } from "../../utils/axios/axiosHelper";
import { useState } from "react";
import { toast, Toaster } from "sonner";

function DeleteModal({ show, handleClose, handleShow, data, deleteMessage , fetchData  }) {
  const [authenticating, setAuthenticating] = useState(false);
  
  const handleDelete = async () => {
    try {
      setAuthenticating(true);
      await fetchData(`${fetchData}`, "put");
      toast.success(deleteMessage);
      setTimeout(() => {
        setAuthenticating(false);
        handleClose();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
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
          <Modal.Title>¿Deseas continuar con la eliminación?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className="fs-5 fw-bold m-0">Esta acción es irreversible, asegúrate bien antes de proceder a la eliminación. </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          <Toaster richColors position="top-center" />
          <ButtonCustom onClick={handleDelete} bgColor={"orange"}>{authenticating ? "Borrando..." : "Aceptar"}</ButtonCustom>
          <ButtonCustom onClick={handleClose} bgColor={"orange"}>Cancelar</ButtonCustom>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
