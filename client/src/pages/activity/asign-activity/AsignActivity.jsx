import React from 'react'
import DashboardLayout from '../../../core/layout/DashboardLayout'
import { Container } from 'react-bootstrap'
import StudentList from './components/StudentList'
import { CirclePlus } from 'lucide-react';

export default function AsignActivity() {
  return (
    <DashboardLayout>
      <Container>
        <h2>Asignar actividades</h2>
        <p className="mb-2">
          Para asignar Actividades a los alumnos, pulse{" "}
          <CirclePlus color="green" /> en el alumno correspondiente.
        </p>
        <StudentList />
      </Container>
    </DashboardLayout>
  );
}
