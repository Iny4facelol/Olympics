import React, { useState } from "react";
import AppLayout from "../../../core/layout/AppLayout";
import { Container } from "react-bootstrap";
import LoginUserForm from "./components/LoginUserForm";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { MailWarning } from "lucide-react";

export default function LoginUser() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <AppLayout>
      <Container className="d-flex flex-column gap-5 px-4 px-sm-2">
        {!showForgotPassword ? (
          <>
            <h2 className="fs-1">Acceso</h2>
            <LoginUserForm setShowForgotPassword={setShowForgotPassword} />
          </>
        ) : (
          <>
            <div>
              <h2>Recuperar contraseña</h2>
              <p>
                Ingresa tu correo electrónico y te enviaremos un enlace con
                instrucciones para <br /> restablecer tu contraseña{" "}
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
