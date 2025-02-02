import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ButtonCustom from "../../../../core/components/Button/Button";
import { toast, Toaster } from "sonner";
import { useAppContext } from "../../../../core/context/AppContext";
import { useTranslation } from "react-i18next";

export default function DenyModal({ show, handleClose, data }) {
  const { themeSwitcher } = useAppContext();
  const [authenticating, setAuthenticating] = useState(false);
  const { t } = useTranslation();

  const handleDenyAuthUser = () => {
    setAuthenticating(true);
    toast.success(t("responsible.denyAuthUserToast"));
    setTimeout(() => {
      setAuthenticating(false);
      handleClose();
    }, 1500);
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
          <Modal.Title>
            {t("responsible.deniedModalTitle")} {data.user_name}?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={themeSwitcher ? "" : "bg-dark text-white"}>
          <p className="fs-5 fw-bold m-0">
          {t("responsible.deniedModalText")}{" "}
            {data.user_name} {t("responsible.deniedModalText2")}
          </p>
          <div className="mt-4 d-flex gap-2">
            <ButtonCustom onClick={handleDenyAuthUser} bgColor={"orange"}>
              {authenticating ? t("responsible.deniedButtonAccepting") : t("responsible.deniedButtonAccept")}
            </ButtonCustom>
            <ButtonCustom onClick={handleClose} bgColor={"orange"}>
              {t("responsible.deniedButtonCancel")}
            </ButtonCustom>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
