import React from "react";
import { Table } from "react-bootstrap";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../core/context/AppContext";

export default function StudentList() {
  const { user } = useAppContext();
  const [users, setUsers] = useState([]);
  console.log(user);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData(
          `api/user/usersToAddActivity/${user.user_center_id}` , "get"
        );
        console.log(response)
        setUsers(response);
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
            <th>Nombre</th>
            <th>Apellidos</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td className="col-actions">#</td>
              <td className="col-name">{user.user_name}</td>
              <td className="col-host-name">{user.user_lastname}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}
