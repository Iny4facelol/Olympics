import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { Table } from "react-bootstrap";

export default function CenterList() {
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData("api/admin/allCenters", "get");
        setCenters(response);
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
            <th>Nombre Centro</th>
            <th>Localidad</th>
            <th>Región</th>
            <th>Dirección</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {centers.map((center) => (
            <tr key={center.center_id}>
              <td className="col-name">{center.center_name}</td>
              <td className="col-center-name">{center.center_city}</td>
              <td className="col-center-province">{center.center_province}</td>
              <td className="col-center-address">{center.center_address}</td>
              <td className="col-center-phone">{center.center_phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}
