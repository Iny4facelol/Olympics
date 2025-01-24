import React from 'react'
import DashboardLayout from '../../../core/layout/DashboardLayout'
import { Container } from 'react-bootstrap'
import AuthUsersList from './components/AuthUsersList'

export default function AuthUsers() {
  return (
    <DashboardLayout>
      <Container className='d-flex flex-column gap-5'>
        <h2 className='fs-1'>Validar autorizaciones</h2>
        <AuthUsersList />
      </Container>
    </DashboardLayout>
  )
}
