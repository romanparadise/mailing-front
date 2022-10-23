import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  launchMailing,
  launchParsing,
  fetchBots,
  fetchProxies,
  fetchProgress,
  fetchLogs,
  fetchParsedGroups,
  fetchMailings,
} from "requests";

import { Toaster } from "react-hot-toast";

import PassPhrase from "containers/PassPhrase";

import { Segmented } from "antd";
import { Button } from "antd";

import { useTranslation } from "react-i18next";

import LanguageSwitch from "../components/LanguageSwitch";
import BotsNProxies from "containers/Sections/BotsNProxies";
import Links from "containers/Sections/Links";
import Geo from "containers/Sections/Geo";
import Launch from "containers/Sections/Launch";
import Mailings from "containers/Sections/Mailings";

import "localization";
import "./App.css";

function App() {
  const [userIsVerified, setUserIsVerified] = useState(false);
  const [userStatus, setUserStatus] = useState(null);

  const [mailingsData, setMailingsData] = useState(null);
  const [botsData, setBotsData] = useState(null);
  const [parsingData, setParsingData] = useState(null);

  const { _botsDataLoading, _botsData } = useQuery(
    ["bots"],
    async () => {
      const data = await fetchBots();
      setBotsData(data);

      return data;
    },
    {
      refetchInterval: 3333,
    }
  );

  const { _mailingsDataLoading, _mailingsData } = useQuery(
    ["mailings"],
    async () => {
      const data = await fetchMailings();
      setMailingsData(data.mailings);

      return data;
    },
    {
      refetchInterval: 3333,
    }
  );

  const { _parsingDataLoading, _parsingData } = useQuery(
    ["parsing"],
    async () => {
      const data = await fetchParsedGroups();
      setParsingData(data);

      return data;
    },
    {
      refetchInterval: 3333,
    }
  );

  const { t } = useTranslation();

  const SECTIONS = [
    {
      name: "UPLOAD_SECTION",
      component: <BotsNProxies />,
      description: t("UPLOAD_SECTION_DESCRIPTION"),
    },
    {
      name: "LINK_PICKER_SECTION",
      component: <Links />,
      description: t("LINK_PICKER_SECTION_DESCRIPTION"),
    },
    {
      name: "LOCATION_PICKER_SECTION",
      component: <Geo />,
      description: t("LOCATION_PICKER_SECTION_DESCRIPTION"),
    },
    {
      name: "LAUNCH_PANEL_SECTION",
      component: (
        <Launch
          bots={botsData}
          parsedGroups={parsingData}
          proxiesAmount={1000}
        />
      ),
      description: t("LAUNCH_SECTION_DESCRIPTION"),
    },
    {
      name: "MAILINGS_SECTION",
      component: <Mailings mailingsData={mailingsData} />,
      description: t("MAILINGS_SECTION_DESCRIPTION"),
    },
  ];

  const [section, setSection] = useState(0);

  if (!userIsVerified) {
    return <PassPhrase verifyUser={() => setUserIsVerified(true)} />;
  }

  return (
    <div className="App">
      <LanguageSwitch />
      <div
        style={{
          width: "700px",
          position: "fixed",
          left: "50%",
          transform: "translate(-50%)",
          margin: "10px",
          textAlign: "center",
        }}
      >
        <Segmented
          value={SECTIONS[section].name}
          onChange={(m) => setSection(SECTIONS.findIndex((i) => i.name === m))}
          size={"large"}
          block
          options={SECTIONS.map((o) =>
            Object({ label: t(o.name), value: o.name })
          )}
        />
      </div>

      <div className="container">
        <div className="contents">
          <div
            style={{
              width: "800px",
              margin: "0 auto",
              color: "#999",
              fontSize: "14pt",
            }}
          >
            {SECTIONS[section]?.description}
          </div>
          {SECTIONS[section].component}
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translate(-50%)",
          margin: "10px",
        }}
      >
        {section !== SECTIONS.length - 1 ? (
          <Button
            onClick={() =>
              setSection((m) => Math.min(m + 1, SECTIONS.length - 1))
            }
            type={section === SECTIONS.length - 1 ? "danger" : "primary"}
            ghost
          >
            {t("NEXT")}
          </Button>
        ) : null}
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
