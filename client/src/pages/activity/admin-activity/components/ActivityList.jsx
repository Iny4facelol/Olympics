import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import "./ActivityList.css";


const BACKEND_URL = import.meta.env.VITE_BACKEND_IMAGE_URL;

export default function ActivityList() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData("api/admin/allActivity", "get");
        setActivities(response);
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
            <th>Nombre</th>
            <th>Nº de participantes</th>
            <th>Descripción</th>
            <th>Imágen</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.activity_id}>
              <td className="col-name">{activity.activity_name}</td>
              <td className="col-participants">{activity.max_participants}</td>
              <td className="col-description">
                {activity.activity_description
                  ? activity.activity_description
                  : "Esta actividad no tiene descripción"}
              </td>
              <td className="col-img">
                <img
                  className="custom-img"
                  src={`${BACKEND_URL}/${activity.activity_image}`}
                  alt=""
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}
