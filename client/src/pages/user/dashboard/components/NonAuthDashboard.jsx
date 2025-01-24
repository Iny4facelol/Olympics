import React, { useState } from "react";
import { CircleX, Search } from "lucide-react";
import ButtonCustom from "../../../../core/components/Button/Button";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useAppContext } from "../../../../core/context/AppContext";

export default function NonAuthDashboard() {
  const { user } = useAppContext();
  const [revision, setRevision] = useState(false);

  const handleUploadDoc = async () => {
    setRevision(true);
  };

  const handleDownloadDoc = async () => {
    try {
      const response = await fetchData(
        `api/user/get-authorization/${user.user_id}`
      );
      console.log(response)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "autorizacion.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error al descargar la autorización:", error);
    }
    setRevision(false);
  };

  return (
    <section className="d-flex flex-column gap-3">
      <article className="w-50">
        <h3 className="text-danger fs-4">
          Autorización necesaria para desbloquear perfil <CircleX />
        </h3>
        <p className="fs-5 pretty">
          Para continuar con el proceso, es indispensable que descarguen la
          autorización correspondiente, la firmen y la suban nuevamente a la
          plataforma mediante los botones que se indican a continuación.
        </p>
      </article>
      <article className="d-flex flex-column gap-4">
        <div className="d-flex gap-3">
          <ButtonCustom onClick={handleDownloadDoc} bgColor={"orange"}>
            Descargar autorización
          </ButtonCustom>
          <ButtonCustom onClick={handleUploadDoc} bgColor={"orange"}>
            Subir autorización
          </ButtonCustom>
        </div>
        <div>
          {revision && (
            <h3 className="fs-4" style={{ color: "#ED931D" }}>
              Autorización en revisión por el responsable de su centro{" "}
              <Search />
            </h3>
          )}
        </div>
      </article>
    </section>
  );
}
