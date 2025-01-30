import React from 'react'
import AppLayout from '../../../core/layout/AppLayout'
import { Container } from 'react-bootstrap';
import RegisterUserForm from './components/RegisterUserForm';
import { useTranslation } from 'react-i18next';

export default function RegisterUser() {
  const {t} = useTranslation();
  return (
    <AppLayout>
      <Container className="d-flex flex-column gap-5 px-4 px-sm-2">
        <h2 className="fs-1">{t("register.registerTitle")}</h2>
        <RegisterUserForm />
      </Container>
    </AppLayout>
  );
}
