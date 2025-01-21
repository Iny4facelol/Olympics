import React from 'react'
import DashboardLayout from '../../../core/layout/DashboardLayout'
import { Container } from 'react-bootstrap'
import ActivityList from './components/ActivityList'

export default function AdminActivity() {
  return (
    <DashboardLayout>
      <Container>
      <h2 className='fs-1'>Administrar actividades</h2>
        <ActivityList />
      </Container>
    </DashboardLayout>
  )
}
