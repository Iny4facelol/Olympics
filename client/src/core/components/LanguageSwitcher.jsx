import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonCustom from "./Button/Button";
import { Dropdown } from "react-bootstrap";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "es", name: "Español", flag: "/spain.png" },
    { code: "en", name: "English", flag: "/gb.png" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  return (
    <Dropdown>
      <Dropdown.Toggle
        className="bg-transparent p-0 border-0"
        id="language-switcher-split"
      >
        <ButtonCustom onClick={() => setIsOpen(!isOpen)} bgColor={"lang"}>
          <img
            src={currentLanguage?.flag}
            alt={currentLanguage?.name}
            style={{ width: "24px" }}
          />
        </ButtonCustom>
      </Dropdown.Toggle>

      <Dropdown.Menu className="rounded-4 bg-transparent border-0">
        {languages.map((lang) => (
          <Dropdown.Item
            style={{ width: "max-content" }}
            className="d-flex align-items-center dropdown-item"
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
          >
            <img
              src={lang.flag}
              alt={lang.name}
              style={{ width: "20px", marginRight: "8px" }}
            />
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
