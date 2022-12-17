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

import { BiHelpCircle } from 'react-icons/bi'

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
import MailingsInProgress from 'containers/Sections/MailingsInProgress'
import Invites from 'containers/Sections/Invites'
import Help from 'containers/Sections/Help'

import Menu from "components/Menu"
import Header from "components/Header";

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
      setMailingsData(data);

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
      name: "MENU_MAILINGS_ENDED",
      component: <Mailings />,
      description: t("MAILINGS_ENDED_DESCRIPTION"),
    },
    {
      name: "MENU_MAILINGS_IN_PROGRESS",
      component: <MailingsInProgress />,
      description: t("MENU_MAILINGS_IN_PROGRESS_SECTION_DESCRIPTION"),
    },
    {
      name: "MENU_MAILINGS_NEW",
      component: <Launch 
        bots={botsData}
        parsedGroups={parsingData}
      />,
      description: t("MENU_MAILINGS_NEW_SECTION_DESCRIPTION"),
    },
    {
      name: "MENU_PARSING_GEO",
      component: <Geo />,
      description: t("LOCATION_PICKER_SECTION_DESCRIPTION"),
    },
    {
      name: "MENU_PARSING_GROUP",
      component: <Links />,
      description: t("MENU_PARSING_GROUP_SECTION_DESCRIPTION"),
    },
    {
      name: "MENU_BOTS_UPLOAD",
      component: <BotsNProxies />,
      description: t("MENU_BOTS_UPLOAD_SECTION_DESCRIPTION"),
    },
    {
      name: "MENU_BOTS_REGISTER",
      component: <div>In Development</div>,
      description: t("MENU_BOTS_REGISTER_SECTION_DESCRIPTION"),
    },
    {
      name: "MENU_INVITES",
      component: <Invites 
        bots={botsData}
        parsedGroups={parsingData}
      />,
      description: t("MENU_INVITES_SECTION_DESCRIPTION"),
    },
    {
      name: "MENU_GUIDE",
      component: <Help />,
      description: t("MENU_GUIDE_SECTION_DESCRIPTION"),
    },
  ];

  const [section, setSection] = useState('MENU_MAILINGS_ENDED');

  return (
    <div className="App">
      <Header contents ={userIsVerified ? t(section) : t('ENTER_PASSPHRASE')}/>
      {
        (!userIsVerified) ?
          <PassPhrase verifyUser={() => setUserIsVerified(true)} />
          : <div className="main-container">
              <div className="container">
                <Menu 
                  onChange={setSection}
                />
              </div>
              <div className="container">
                <div className="contents">
                    <div style={{position: 'relative'}} className="description-block white-wrapper">
                    <div style={{position: 'absolute', right: 0, top: 0, margin: '10px', opacity: '0.6', fontSize: '15pt'}}>
                      <BiHelpCircle />
                    </div>
                    <div style={{textAlign: 'center', opacity: 1, fontWeight: 500}}>{t("INFO")}</div>
                    {SECTIONS.find(i => i.name===section)?.description}
                      </div>
                  <div className="white-wrapper">
                  
                  {SECTIONS.find(i => i.name===section)?.component}
                  </div>
                </div>
              </div>
            </div>
      }

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default App;
