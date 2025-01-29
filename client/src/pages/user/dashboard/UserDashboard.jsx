import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Badge, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppContext } from "../../../core/context/AppContext";
import NonAuthDashboard from "./components/NonAuthDashboard";
import AuthDashboard from "./components/AuthDashboard";
import { fetchData } from "../../../utils/axios/axiosHelper";
import { ShieldCheck } from "lucide-react";
import ButtonCustom from "../../../core/components/Button/Button";

export default function UserDashboard() {
  const { user } = useAppContext();
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData(
          `api/user/NonAuthProfile/${user.user_id}`,
          "get"
        );
        console.log(response);
        setUserDetails(response);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <DashboardLayout>
      <Container className="d-flex justify-content-center flex-column gap-5 px-4 px-sm-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fs-1">
            Te damos la bienvenida,{" "}
            <span className="custom-span">{userDetails.name}</span>
          </h2>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="tooltip-id">
                La cuenta ha sido autorizada correctamente.
              </Tooltip>
            }
          >
            <div className="d-flex gap-1 bg-success justify-content-center align-align-items-center rounded-4 py-2  px-3 m-0 text-white">
              <p
                style={{ fontSize: "12px" }}
                className="bg-success justify-content-center align-align-items-center m-0 text-white d-none d-sm-flex"
              >
                Cuenta verificada
              </p>
              <ShieldCheck color="white" size={18} />
            </div>
          </OverlayTrigger>
        </div>
        {userDetails.authorized ? (
          <AuthDashboard userData={userDetails} />
        ) : (
          <NonAuthDashboard />
        )}
      </Container>
    </DashboardLayout>
  );
}
