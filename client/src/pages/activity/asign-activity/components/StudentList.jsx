import React from 'react'
import { Table } from 'react-bootstrap';
import { fetchData } from '../../../../utils/axios/axiosHelper';
import { useEffect, useState } from 'react';

export default function StudentList() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const getData = async () => {
      try {
        // const response = await fetchData('http://localhost:5000/olympics');
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [])

  return (
    <section className="d-flex gap-4 py-4 flex-column justify-content-center align-content-center">
      <Table
        striped
        bordered
        hover
        responsive
        className="text-center align-middle"
      >
        <thead>
          <tr>
            <th>Acciones</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Actividades</th>
          </tr>
        </thead>
        <tbody>
          {olympics.map((olympic) => (
            <tr key={olympic.olympics_id}>
              <td className="col-name">{olympic.olympics_name}</td>
              <td className="col-host-name">{olympic.olympics_host_name}</td>
              <td className="col-host-city">{olympic.olympics_host_city}</td>
              <td className="col-host-address">
                {olympic.olympics_host_address}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}
