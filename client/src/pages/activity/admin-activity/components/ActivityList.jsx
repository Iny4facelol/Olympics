import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import "./ActivityList.css";
import { SquarePen, Trash2 } from "lucide-react";
import  ActivityEditModal  from "./ActivityEditModal";
import DeleteModal from "../../../../core/components/DeleteModal";
import { useAppContext } from "../../../../core/context/AppContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_IMAGE_URL;

export default function ActivityList() {
  const { themeSwitcher } = useAppContext();
  const [activities, setActivities] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [activityEditData, setActivityEditData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

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
  }, [show, showDelete]);

  const handleLogicDelete = async (activity_id) => {
    const data = activities.find(
      (activity) => activity.activity_id === activity_id
    );
    setActivityEditData(data);
    handleShowDelete();
  };

  const handleEdit = (activity_id) => {
    const data = activities.find(
      (activity) => activity.activity_id === activity_id
    );
    setActivityEditData(data);
    handleShow();
  };

  return (
    <section className="d-flex gap-4 py-4 flex-column justify-content-center align-content-center">
      <Table
        variant={themeSwitcher ? "" : "dark"}
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
            <th>Nº de participantes</th>
            <th>Descripción</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.activity_id}>
              <td style={{ width: "10%" }}>
                <Trash2
                  onClick={() => handleLogicDelete(activity.activity_id)}
                  size="24"
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                />{" "}
                <SquarePen
                  onClick={() => handleEdit(activity.activity_id)}
                  size="24"
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                />
              </td>
              <td className="col-name" style={{ width: "10%" }}>
                {activity.activity_name}
              </td>
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
      <ActivityEditModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        data={activityEditData}
      />
      <DeleteModal
        handleClose={handleCloseDelete}
        handleShow={handleShowDelete}
        show={showDelete}
        data={activityEditData}
        deleteMessage={"Actividad eliminada con éxito"}
        apiEndpoint={`api/admin/logicalDeleteActivity/${activityEditData.activity_id}`}
      />
    </section>
  );
}
