import React from "react";
import { Table } from "react-bootstrap";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../core/context/AppContext";
import { CirclePlus } from "lucide-react";
import AsignActivityModal from "./AsignActivityModal";
import { set } from "react-hook-form";

export default function StudentList() {
  const { user, themeSwitcher } = useAppContext();
  const [users, setUsers] = useState([]);
  const [usersToAdd, setUsersToAdd] = useState({});	
  const [show, setShow] = useState(false);

  console.log(usersToAdd)

  const handleClose = () => setShow(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData(
          `api/user/usersToAddActivity/${user.user_center_id}`,
          "get"
        );
        console.log(response);
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const handleAddActivities = async (user_id) => {
    const data = users.find((user) => user.user_id === user_id);
    setUsersToAdd(data);
    setShow(true);
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
            <th>Apellidos</th>
            <th>Teléfono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td className="col-actions" style={{ width: "10%" }}>
                <CirclePlus
                  onClick={() => handleAddActivities(user.user_id)}
                  size="24"
                  className="text-success custom-icon"
                  style={{ cursor: "pointer" }}
                />
              </td>
              <td className="col-name" style={{ width: "20%" }}>
                {user.user_name}
              </td>
              <td className="col-host-name" style={{ width: "20%" }}>
                {user.user_lastname}
              </td>
              <td className="col-host-name" style={{ width: "20%" }}>
                {user.user_phone}
              </td>
              <td className="col-host-name">{user.user_email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AsignActivityModal
        handleClose={handleClose}
        show={show}
        data={usersToAdd}
      />
    </section>
  );
}
