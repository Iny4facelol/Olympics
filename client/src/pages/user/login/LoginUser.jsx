import React, { useState } from "react";
import AppLayout from "../../../core/layout/AppLayout";
import { Container } from "react-bootstrap";
import LoginUserForm from "./components/LoginUserForm";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { MailWarning } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LoginUser() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { t } = useTranslation();

  return (
    <AppLayout>
      <Container className="d-flex flex-column gap-5 px-4 px-sm-2">
        {!showForgotPassword ? (
          <>
            <h2 className="fs-1">{t("auth.login")}</h2>
            <LoginUserForm setShowForgotPassword={setShowForgotPassword} />
          </>
        ) : (
          <>
            <div>
              <h2>{t("auth.forgotPassword")}</h2>
              <p>
                {t("auth.forgotPasswordInfo")}{" "}
                <MailWarning color="#ee531e" size={18} />
              </p>
            </div>
            <ForgotPasswordForm setShowForgotPassword={setShowForgotPassword} />
          </>
        )}
      </Container>
    </AppLayout>
  );
}
