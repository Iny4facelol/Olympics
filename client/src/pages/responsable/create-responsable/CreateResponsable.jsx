import React from 'react'
import DashboardLayout from '../../../core/layout/DashboardLayout'
import { Container } from 'react-bootstrap'
import CreateResponsableForm from './components/CreateResponsableForm'

export default function CreateResponsable() {
  return (
    <DashboardLayout>
      <Container className="d-flex flex-column gap-5 px-4 px-sm-2">
        <h2 className='fs-1'>Crear un nuevo responsable</h2>
        <CreateResponsableForm />
      </Container>
    </DashboardLayout>
  )
}
