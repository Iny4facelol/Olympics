import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../../utils/axios/axiosHelper';
import { Table } from 'react-bootstrap';

export default function OlympicsList() {
  const [olympics,setOlympics] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData("api/admin/allOlympics", "get");
        setOlympics(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  
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
            <th>Nombre Olimpiada</th>
            <th>Nombre Sede</th>
            <th>Ciudad Sede</th>
            <th>Dirección Sede</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {olympics.map((olympic) => (
            <tr key={olympic.olympics_id}>
              <td className="col-name">{olympic.olympics_name}</td>
              <td className="col-host-name">{olympic.olympics_host_name}</td>
              <td className="col-host-city">{olympic.olympics_host_city}</td>
              <td className="col-host-address">{olympic.olympics_host_address}</td>
              <td className="col-start-date">{olympic.olympics_start_date.split("-").reverse().join("-")}</td>
              <td className="col-end-date">{olympic.olympics_end_date.split("-").reverse().join("-")}</td>
              <td>
                {olympic.olympics_description
                  ? olympic.olympics_description
                  : "Esta actividad no tiene descripción"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}
