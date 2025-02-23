import React from 'react'
import AppLayout from '../../../core/layout/AppLayout'
import { Container } from 'react-bootstrap'
import ResetPasswordForm  from './components/ResetPasswordForm'

export const ResetPassword = () => {
  return (
    <AppLayout>
      <Container className="d-flex flex-column gap-5 px-4 px-sm-2">
        <h2 className="fs-1">Restablecer contraseña</h2>
        <ResetPasswordForm />
      </Container>
    </AppLayout>
  )
}
