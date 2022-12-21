import React from "react";
import { useState } from "react";
import "antd/dist/antd.css";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { launchParsing } from "requests";
import { compareAsc, format } from 'date-fns'


const Links = () => {
  const { t } = useTranslation();

  const [hasStarted, setHasStarted] = useState(false);

  const [links, setLinks] = useState([]);
  const [parsingName, setParsingName] = useState(
    "groups_" + format(new Date(), 'dd.MM_HH:mm')

  );

  const addLink = (link) =>
    setLinks((prevLinks) =>
      prevLinks.includes(link) || !link ? prevLinks : [...prevLinks, link]
    );

  const removeLink = (link) =>
    setLinks((prevLinks) => prevLinks?.filter((l) => l !== link));

  const sendParsingRequest = async () => {
    setHasStarted(true);
    if (links?.length === 0) {
      toast.error(t("LINKS_LIST_IS_EMPTY"));
      setHasStarted(false);
      return;
    }

    let res;
    try {
      res = await launchParsing({
        name: parsingName,
        groups: links,
      });
      console.log('parsing res is', res)
    } catch(e) {
      toast.error(
        `${t("COULD_NOT_RUN_PARSING")}: ${e}`
      );
      setHasStarted(false);
      return
    }
    
    if (res && !res.detail && !res.error) {
      setLinks([]);
      toast(t("PARSING_STARTED"), {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      console.log('parsing error: ', res)
      toast.error(
        `${t("COULD_NOT_RUN_PARSING")}: ${res?.message || res?.detail?.msg || res?.error || "Something went wrong"}`
      );
    }

    setHasStarted(false);
  };

  const launchControls = (
    <div
      style={{
        padding: "30px 0",
        width: "500px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{margin: '0 auto'}}>
        <Button disabled={hasStarted} onClick={sendParsingRequest} type="primary">
          {t("PARSE")}
        </Button>
      </div>
    </div>
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <div style={{margin: '-10px 0 0 -50px', width: 'fit-content', borderBottom: '1px solid #eee', width: 'calc(100% + 100px)'}}>
          <div style={{ width: 'fit-content', margin: 'auto'}}>
            <div style={{display: 'flex', fontSize: '12pt'}}>
              <div style={{margin: '10px'}}>{t("ENTER_NAME_TO_SAVE")}</div>
              <div style={{width: '200px', margin: '10px'}}><Input
                style={{ width: "100%" }}
                value={parsingName}
                onChange={(e) => setParsingName(e.target.value)}
                size='small'
              /></div>
            </div>
          </div>
        </div>
      <div style={{ width: "500px", margin: "20px auto" }}>
        <Input
          addonBefore="t.me/"
          onPressEnter={(e) => {
            addLink(e.target.value);
          }}
          placeholder={t("TYPE_AND_PRESS_ENTER_TO_ADD")}
        />
      </div>
      <div style={{ marginTop: "-30px", marginBottom: '10px', fontSize: "15pt", opacity: 0.5 }}>
        {links?.length ? t("FOLLOWING_GROUPS_WILL_BE_PARSED") : t("TYPE_LINKS_IN_FIELD_ABOVE")}
      </div>
      <div style={{ fontSize: "15pt", fontWeight: "300", opacity: 0.95 }}>
        {links.map((link) => {
          return (
            <div key={link}>
              <span>{link}</span>
              <span
                style={{
                  marginLeft: "5px",
                  color: "#888",
                  fontSize: "13pt",
                  opacity: 0.3,
                }}
                onClick={() => removeLink(link)}
              >
                <DeleteOutlined />
              </span>
            </div>
          );
        })}
      </div>
      
      {launchControls}
    </div>
  );
};

export default Links;
