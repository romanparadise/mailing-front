import React from "react";
import "./styles.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Segmented } from "antd";

const LanguageSwitch = () => {
  const [lng, setLng] = useState("en");
  const { t, i18n } = useTranslation();

  const onChange = (l) => {
    setLng(l);
    i18n.changeLanguage(l);
  };

  return (
    <div className="language-switch">
      <Segmented
        default={lng}
        onChange={onChange}
        options={["en", "ru", "zh"]}
      />
    </div>
  );
};

export default LanguageSwitch;
