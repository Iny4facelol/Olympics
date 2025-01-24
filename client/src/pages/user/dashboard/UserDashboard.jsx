import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import { useAppContext } from "../../../core/context/AppContext";
import NonAuthDashboard from "./components/NonAuthDashboard";
import AuthDashboard from "./components/AuthDashboard";
import { fetchData } from "../../../utils/axios/axiosHelper";

export default function UserDashboard() {
  const {user} = useAppContext()
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData(`api/user/NonAuthProfile/${user.user_id}`, "get");
        console.log(response);
        setUserDetails(response);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [])  



  return (
    <DashboardLayout>
      <Container className="d-flex justify-content-center flex-column gap-5 px-4 px-sm-2">
        <h2 style={{ fontSize: "72px" }}>
          Bienvenido, <span className="custom-span">{userDetails.name}</span>
        </h2>
        {userDetails.authorized ? (
          <AuthDashboard userData={userDetails} />
        ) : (
          <NonAuthDashboard  />
        )}

      </Container>
    </DashboardLayout>
  );
}
