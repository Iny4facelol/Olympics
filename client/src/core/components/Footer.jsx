import { useTranslation } from "react-i18next";

export default function Footer() {
  const {t} = useTranslation();
  return (
    <footer className="py-3 bg-dark w-100">
      <div className="text-light text-center  px-2 user-select-none">
        <p className="m-0">&copy;{t("footer.copyrightText")}</p>
      </div>
    </footer>
  );
}
