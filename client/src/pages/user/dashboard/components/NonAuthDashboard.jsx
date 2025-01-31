import React, { useEffect, useRef, useState } from "react";
import { CircleX, Download, Search, Upload } from "lucide-react";
import ButtonCustom from "../../../../core/components/Button/Button";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { useAppContext } from "../../../../core/context/AppContext";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_BACKEND_DOC_URL;

export default function NonAuthDashboard() {
  const { user } = useAppContext();
  const { t } = useTranslation();
  const [revision, setRevision] = useState(false);
  const [downloadFile, setDownloadFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  console.log(downloadFile);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUploadDoc(file);
    }
  };

  const handleUploadDoc = async (file) => {
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      await fetchData(
        `api/user/upload-authorization/${user.user_id}`,
        "put",
        formData
      );
    } catch (error) {
      console.error("Error al subir la autorización:", error);
    } finally {
      setTimeout(() => {
        toast.success(t("user_dashboard.toastMessage"));
        setRevision(true);
        setIsUploading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const handleDownloadDoc = async () => {
      try {
        const response = await fetchData(
          `api/user/authorization-file/${user.user_id}`,
          "get"
        );

        setDownloadFile(response.userFileName);
      } catch (error) {
        console.error("Error al descargar la autorización:", error);
      }
      setRevision(false);
    };
    handleDownloadDoc();
  }, []);

  return (
    <section className="d-flex flex-column gap-3">
      <article className="w-50">
        <h3 className="text-danger fs-4">
          {t("user_dashboard.nonAuthMessage")} <CircleX />
        </h3>
        <p className="fs-5 pretty">{t("user_dashboard.nonAuthText")}</p>
      </article>
      <article className="d-flex flex-column gap-4">
        <div className="d-flex gap-3">
          <ButtonCustom  bgColor={"orange"}>
            <a href={`${BACKEND_URL}/${downloadFile}`} download>
              <Download size={20} /> {t("user_dashboard.downloadButton")}
            </a>
          </ButtonCustom>
          <ButtonCustom
            onClick={() => fileInputRef.current?.click()}
            bgColor="orange"
            disabled={isUploading}
          >
            <div className="d-flex align-items-center gap-2">
              <Upload size={20} />
              {isUploading
                ? t("user_dashboard.uploadingButton")
                : t("user_dashboard.uploadButton")}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="d-none"
            />
          </ButtonCustom>
        </div>
        <div>
          {revision && (
            <h3 className="fs-4" style={{ color: "#ED931D" }}>
              {t("user_dashboard.check")} <Search />
            </h3>
          )}
        </div>
      </article>
    </section>
  );
}
