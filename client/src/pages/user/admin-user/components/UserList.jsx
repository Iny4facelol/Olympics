import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { Table } from "react-bootstrap";

export default function UserList() {
  const [users, setUsers] = useState([]);

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
              <td className="col-name">{user.user_name} {user.user_lastname}</td>
              <td className="col-user-name">{user.user_city}</td>
              <td className="col-user-province">{user.user_type === 1 ? "Admin" : user.user_type === 2 ? "Responsable" : "Alumno"}</td>
              <td className="col-user-address">{user.center_name}</td>
              <td className="col-user-phone">{user.user_phone}</td>
              <td className="col-user-email">{user.user_email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}
