import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAppContext } from "../../../../core/context/AppContext";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { CircleCheckBig, CircleX } from "lucide-react";
import "./AuthUsersList.css";
import DeleteModal from "../../../../core/components/DeleteModal";
import AuthModal from "./AuthModal";
import DenyModal from "./DenyModal";

export default function AuthUsersList() {
  const { user, themeSwitcher } = useAppContext();
  const [unauthorizedUsers, setUnauthorizedUsers] = useState([]);
  const [authUserData, setAuthUserData] = useState({});
  const [show, setShow] = useState(false);
  const [showDeny, setShowDeny] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseDeny = () => setShowDeny(false);
  const handleShowDeny = () => setShowDeny(true);

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
  }, [show, showDeny]);

  const handleAuthUser = (user_id) => {
    const data = unauthorizedUsers.find((user) => user.user_id === user_id);
    setAuthUserData(data);
    handleShow();
  };

  const handleDenyAuthUser = (user_id) => {
    const data = unauthorizedUsers.find((user) => user.user_id === user_id);
    setAuthUserData(data);
    handleShowDeny();
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
            <th>Nombre Alumno</th>
            <th>Autorización</th>
          </tr>
        </thead>
        <tbody>
          {unauthorizedUsers.map((user) => (
            <tr key={user.user_id}>
              <td className="col-action">
                <CircleCheckBig
                  onClick={() => handleAuthUser(user.user_id)}
                  size="24"
                  className="text-success custom-icon"
                  style={{ cursor: "pointer" }}
                />{" "}
                <CircleX
                  onClick={() => handleDenyAuthUser(user.user_id)}
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
      <AuthModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        data={authUserData}
      />
      <DenyModal
        handleClose={handleCloseDeny}
        show={showDeny}
        data={authUserData}
      />
    </section>
  );
}
