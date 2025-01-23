import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAppContext } from "../../../../core/context/AppContext";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { CircleCheckBig, CircleX } from "lucide-react";
import "./AuthUsersList.css";

export default function AuthUsersList() {
  const { user } = useAppContext();
  const [unauthorizedUsers, setUnauthorizedUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData(
          `api/user/pendingValidationUsers/${user.user_center_id}`,
          "get"
        );
        setUnauthorizedUsers(response);
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
            <th>Acciones</th>
            <th>Nombre Alumno</th>
            <th>Autorización</th>
          </tr>
        </thead>
        <tbody>
          {unauthorizedUsers.map((user) => (
            <tr key={user.user_id}>
              <td className="col-action">
                <CircleCheckBig
                  onClick={() => handleLogicDelete(olympic.olympics_id)}
                  size="24"
                  className="text-success custom-icon"
                  style={{ cursor: "pointer" }}
                />{" "}
                <CircleX
                  onClick={() => handleEdit(olympic.olympics_id)}
                  size="24"
                  style={{ cursor: "pointer" }}
                  className="text-danger custom-icon"
                />
              </td>
              <td className="col-name">
                {user.user_name} {user.user_lastname}
              </td>
              <td className="col-permission-file">
                {user.user_permission_file}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <DeleteModal
        handleClose={handleCloseDelete}
        handleShow={handleShowDelete}
        show={showDelete}
        data={olympicsEditData}
      />
    </section>
  );
}
