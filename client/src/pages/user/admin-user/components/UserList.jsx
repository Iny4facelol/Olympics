import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { Table } from "react-bootstrap";
import { SquarePen, Trash2 } from "lucide-react";
import UserEditModal from "./UserEditModal";
import DeleteModal from "../../../../core/components/DeleteModal";
import ResponsibleEditModal from "./ResponsibleEditModal";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showResponsibleModal, setShowResponsibleModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [userEditData, setUserEditData] = useState({});

  const handleClose = () => {
    setShowUserModal(false);
    setShowResponsibleModal(false);
  };
  const handleShowUserModal = () => setShowUserModal(true);
  const handleShowResponsibleModal = () => setShowResponsibleModal(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData("api/admin/allUser", "get");
        setUsers(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [showUserModal, showResponsibleModal]);

  const handleLogicDelete = async (user_id) => {
    const data = users.find((user) => user.user_id === user_id);
    setUserEditData(data);
    handleShowDelete();
  };

  const handleEditUser = (user_id) => {
    const data = users.find((user) => user.user_id === user_id);
    setUserEditData(data);
    if (data.user_type === 3) {
      handleShowUserModal();
    } else if (data.user_type === 2) {
      handleShowResponsibleModal();
    }
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
            <th>Nombre</th>
            <th>Localidad</th>
            <th>Tipo de Usuario</th>
            <th>Centro</th>
            <th>Teléfono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>
                <Trash2
                  onClick={() => handleLogicDelete(user.user_id)}
                  size="24"
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                />{" "}
                <SquarePen
                  onClick={() => {
                    if (user.user_type === 3 || user.user_type === 2) {
                      handleEditUser(user.user_id);
                    }
                  }}
                  size="24"
                  className="text-success"
                  style={{ cursor: "pointer" }}
                />                
              </td>
              <td className="col-name">
                {user.user_name} {user.user_lastname}
              </td>
              <td className="col-user-name">{user.user_city}</td>
              <td className="col-user-province">
                {user.user_type === 1
                  ? "Admin"
                  : user.user_type === 2
                  ? "Responsable"
                  : "Alumno"}
              </td>
              <td className="col-user-address">{user.center_name}</td>
              <td className="col-user-phone">{user.user_phone}</td>
              <td className="col-user-email">{user.user_email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showUserModal && (
        <UserEditModal
          handleClose={handleClose}
          show={showUserModal}
          data={userEditData}
        />
      )}

      {showResponsibleModal && (
        <ResponsibleEditModal
          handleClose={handleClose}
          show={showResponsibleModal}
          data={userEditData}
        />
      )}
      <DeleteModal
        handleClose={handleCloseDelete}
        handleShow={handleShowDelete}
        show={showDelete}
        data={userEditData}
      />
    </section>
  );
}
