import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { toast, Toaster } from "sonner";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useAppContext } from "../../../../core/context/AppContext";
import { useTranslation } from "react-i18next";

export default function AuthModal({ show, handleClose, handleShow, data }) {
  const { themeSwitcher } = useAppContext();
  const [authenticating, setAuthenticating] = useState(false);
  const { t } = useTranslation();

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
          <Modal.Title>{t("responsible.authModalTitle")}{data.user_name}?</Modal.Title>
        </Modal.Header>
        <Modal.Body className={themeSwitcher ? "" : "bg-dark text-white"}>
          <p className="fs-5 fw-bold m-0">
          {t("responsible.authModalText")}{" "}
            {data.user_name} {t("responsible.authModalText2")}
          </p>
          <div className="mt-4 d-flex gap-2">
            <ButtonCustom onClick={handleAuthUser} bgColor={"orange"}>
              {authenticating ? t("responsible.authButtonAccepting") : t("responsible.authButtonAccept")}
            </ButtonCustom>
            <ButtonCustom onClick={handleClose} bgColor={"orange"}>
            {t("responsible.authButtonCancel")}
            </ButtonCustom>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
