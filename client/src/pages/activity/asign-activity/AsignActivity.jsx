import React from 'react'
import DashboardLayout from '../../../core/layout/DashboardLayout'
import { Container } from 'react-bootstrap'
import StudentList from './components/StudentList'

export default function AsignActivity() {
  return (
    <DashboardLayout>
      <Container>
        <h2>Asignar actividades</h2>
        <StudentList />
      </Container>
    </DashboardLayout>
  )
}
