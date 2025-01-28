import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { Table } from "react-bootstrap";
import { CirclePlus, Square, SquarePen, Trash2 } from "lucide-react";
import CenterEditModal from "./CenterEditModal";
import DeleteModal from "../../../../core/components/DeleteModal";
import CenterOlympicsModal from "./CenterOlympicsModal";
import { useAppContext } from "../../../../core/context/AppContext";

export default function CenterList() {
  const {token} = useAppContext();
  const [centers, setCenters] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showOlympics, setShowOlympics] = useState(false);
  const [centerEditData, setCenterEditData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleCloseOlympics = () => setShowOlympics(false);
  const handleShowOlympics = () => setShowOlympics(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData("api/admin/allCenters", "get", null, {Authorization: `Bearer ${token}`});
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

  const handleAddOlympics = (center_id) => {
    const data = centers.find((center) => center.center_id === center_id);
    setCenterEditData(data);
    handleShowOlympics();
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
            <th>Localidad</th>
            <th>Región</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {centers.map((center) => (
            <tr key={center.center_id}>
              <td style={{ width: "10%" }}>
                <Trash2
                  onClick={() => handleLogicDelete(center.center_id)}
                  size="24"
                  className="text-danger custom-icon"
                  style={{ cursor: "pointer" }}
                />{" "}
                <SquarePen
                  onClick={() => handleEdit(center.center_id)}
                  size="24"
                  className="text-primary custom-icon"
                  style={{ cursor: "pointer" }}
                />{" "}
                <CirclePlus
                  onClick={() => handleAddOlympics(center.center_id)}
                  size="24"
                  className="text-success custom-icon"
                  style={{ cursor: "pointer" }}
                />
              </td>
              <td className="col-name" style={{ width: "20%" }}>
                {center.center_name}
              </td>

              <td className="col-center-name">{center.center_city}</td>
              <td className="col-center-province">{center.center_province}</td>
              <td className="col-center-address">{center.center_address}</td>
              <td className="col-center-phone">{center.center_phone}</td>
              <td className="col-center-email" style={{ width: "10%" }}>
                {center.center_email}
              </td>
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
      <CenterOlympicsModal
        handleClose={handleCloseOlympics}
        handleShow={handleShowOlympics}
        show={showOlympics}
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
