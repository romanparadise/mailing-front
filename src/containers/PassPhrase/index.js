import React from "react";
import { useRef } from "react";
import { Input } from 'antd'
import { useTranslation } from "react-i18next";
import "./styles.css";

const PW = "gamble777";
const {Search} = Input

// const ACCESS_LEVELS = {
//   usual: "",
//   admin: "",
// };

export default function PassPhrase({ verifyUser }) {
  const { t } = useTranslation();

  const validatePhrase = (passphraseInput) => {
    if (
      passphraseInput.toLowerCase().replaceAll(" ", "") === PW
    ) {
      verifyUser();
    }
  };

  return (
    <div className="passphrase-box">
        <Search
          type="password"
          placeholder={t("ENTER_PASSPHRASE")}
          enterButton={t("ENTER")}
          value="gamble777"
          size="large"
          onSearch={(pw) => validatePhrase(pw)}
        />
    </div>
  );
}
