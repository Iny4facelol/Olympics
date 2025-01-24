import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { Table } from "react-bootstrap";
import { Square, SquarePen, Trash2 } from "lucide-react";
import CenterEditModal from "./CenterEditModal";
import DeleteModal from "../../../../core/components/DeleteModal";

export default function CenterList() {
  const [centers, setCenters] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [centerEditData, setCenterEditData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

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
  }, [show, showDelete]);

  const handleLogicDelete = async (center_id) => {
    const data = centers.find((center) => center.center_id === center_id);
    setCenterEditData(data);
    handleShowDelete();
  };

  const handleEdit = (center_id) => {
    const data = centers.find((center) => center.center_id === center_id);
    setCenterEditData(data);
    handleShow();
  };

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
            <th>Nombre Centro</th>
            <th>Email</th>
            <th>Localidad</th>
            <th>Región</th>
            <th>Dirección</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {centers.map((center) => (
            <tr key={center.center_id}>
              <td>
                <Trash2
                  onClick={() => handleLogicDelete(center.center_id)}
                  size="24"
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                />{" "}
                <SquarePen
                  onClick={() => handleEdit(center.center_id)}
                  size="24"
                  className="text-success"
                  style={{ cursor: "pointer" }}
                />
              </td>
              <td className="col-name">{center.center_name}</td>
              <td className="col-center-email">{center.center_email}</td>
              <td className="col-center-name">{center.center_city}</td>
              <td className="col-center-province">{center.center_province}</td>
              <td className="col-center-address">{center.center_address}</td>
              <td className="col-center-phone">{center.center_phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CenterEditModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        data={centerEditData}
      />
      <DeleteModal
        handleClose={handleCloseDelete}
        handleShow={handleShowDelete}
        show={showDelete}
        data={centerEditData}
        deleteMessage="Centro eliminado con éxito"
        apiEndpoint={`api/admin/logicalDeleteCenter/${centerEditData.center_id}`}
      />
    </section>
  );
}
