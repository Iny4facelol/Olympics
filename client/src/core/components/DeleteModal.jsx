import { Modal } from "react-bootstrap";
import ButtonCustom from "./Button/Button";
import { fetchData } from "../../utils/axios/axiosHelper";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useAppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";

function DeleteModal({
  show,
  handleClose,
  handleShow,
  data,
  deleteMessage,
  apiEndpoint,
}) {
  const { themeSwitcher } = useAppContext();
  const { t } = useTranslation();
  const [authenticating, setAuthenticating] = useState(false);

  const handleDelete = async () => {
    try {
      setAuthenticating(true);
      await fetchData(`${apiEndpoint}`, "put");
      toast.success(deleteMessage);
      setTimeout(() => {
        setAuthenticating(false);
        handleClose();
      }, 1000);
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
          <Modal.Title>{t("deleteModal.deleteModalTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={themeSwitcher ? "" : "bg-dark text-white"}>
          <p className="fs-5 fw-bold m-0">
            {t("deleteModal.deleteModalText")}{" "}
          </p>
        </Modal.Body>
        <Modal.Footer
          className={
            themeSwitcher
              ? "d-flex justify-content-start"
              : " d-flex justify-content-start bg-dark text-white"
          }
        >
          <Toaster richColors position="top-center" />
          <ButtonCustom onClick={handleDelete} bgColor={"orange"}>
            {authenticating ? t("deleteModal.deletingButton") : t("deleteModal.deleteButton")}
          </ButtonCustom>
          <ButtonCustom onClick={handleClose} bgColor={"orange"}>
           {t("deleteModal.cancelButton")}
          </ButtonCustom>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
