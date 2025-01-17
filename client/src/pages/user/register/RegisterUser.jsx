import React from 'react'
import AppLayout from '../../../core/layout/AppLayout'
import { Container } from 'react-bootstrap';
import RegisterUserForm from './components/RegisterUserForm';

export default function RegisterUser() {
  return (
    <AppLayout>
      <Container className="d-flex flex-column gap-5">
        <h2 className="fs-1">Registro</h2>
        <RegisterUserForm />
      </Container>
    </AppLayout>
  );
}
