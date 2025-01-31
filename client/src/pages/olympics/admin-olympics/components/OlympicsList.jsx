import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { Table } from "react-bootstrap";
import { CirclePlus, SquarePen, Trash2 } from "lucide-react";
import OlympicsEditModal from "./OlympicsEditModal";
import DeleteModal from "../../../../core/components/DeleteModal";
import OlympicsActivityModal from "./OlympicsActivityModal";
import { useAppContext } from "../../../../core/context/AppContext";
import { useTranslation} from "react-i18next";

export default function OlympicsList() {
  const { themeSwitcher } = useAppContext();
  const [olympics, setOlympics] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [olympicsEditData, setOlympicsEditData] = useState({});
  const {t} = useTranslation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleCloseActivity = () => setShowActivity(false);
  const handleShowActivity = () => setShowActivity(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData("api/admin/allOlympics", "get");
        setOlympics(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [show, showDelete]);

  const handleLogicDelete = async (olympics_id) => {
    const data = olympics.find(
      (olympic) => olympic.olympics_id === olympics_id
    );
    setOlympicsEditData(data);
    handleShowDelete();
  };

  const handleEdit = (olympics_id) => {
    const data = olympics.find(
      (olympic) => olympic.olympics_id === olympics_id
    );
    setOlympicsEditData(data);
    handleShow();
  };

  const handleAddActivity = (olympics_id) => {
    const data = olympics.find(
      (olympic) => olympic.olympics_id === olympics_id
    );
    setOlympicsEditData(data);
    handleShowActivity();
  }


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
            <th>{t("olympics.actions")}</th>
            <th>{t("olympics.olympicsName")}</th>
            <th>{t("olympics.olympicsHostName")}</th>
            <th>{t("olympics.olympicsHostCity")}</th>
            <th>{t("olympics.olympicsAddress")}</th>
            <th>{t("olympics.startDate")}</th>
            <th>{t("olympics.endDate")}</th>
            <th>{t("olympics.olympicsDescription")}</th>
          </tr>
        </thead>
        <tbody>
          {olympics.map((olympic) => (
            <tr key={olympic.olympics_id}>
              <td className="col-olympics-action" style={{ width: "10%" }}>
                <Trash2
                  onClick={() => handleLogicDelete(olympic.olympics_id)}
                  size="24"
                  className="text-danger custom-icon"
                  style={{ cursor: "pointer" }}
                />{" "}
                <SquarePen
                  onClick={() => handleEdit(olympic.olympics_id)}
                  size="24"
                  className="text-primary custom-icon"
                  style={{ cursor: "pointer" }}
                />{" "}
                <CirclePlus
                  onClick={() => handleAddActivity(olympic.olympics_id)}
                  size="24"
                  className="text-success custom-icon"
                  style={{ cursor: "pointer" }}
                />
              </td>
              <td className="col-olympics-name">{olympic.olympics_name}</td>
              <td className="col-host-name">{olympic.olympics_host_name}</td>
              <td className="col-host-city">{olympic.olympics_host_city}</td>
              <td className="col-host-address">
                {olympic.olympics_host_address}
              </td>
              <td className="col-start-date">
                {olympic.olympics_start_date.split("-").reverse().join("-")}
              </td>
              <td className="col-end-date">
                {olympic.olympics_end_date.split("-").reverse().join("-")}
              </td>
              <td>
                {olympic.olympics_description
                  ? olympic.olympics_description
                  : t("olympics.activityDescriptionNull")}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <OlympicsEditModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        data={olympicsEditData}
      />
      <OlympicsActivityModal
        handleClose={handleCloseActivity}
        handleShow={handleShowActivity}
        show={showActivity}
        data={olympicsEditData}
      />

      <DeleteModal
        handleClose={handleCloseDelete}
        handleShow={handleShowDelete}
        show={showDelete}
        data={olympicsEditData}
        deleteMessage={t("olympics.olympiadSuccessfullyDeleted")}
        apiEndpoint={`api/admin/logicalDeleteOlympics/${olympicsEditData.olympics_id}`}
      />
    </section>
  );
}
