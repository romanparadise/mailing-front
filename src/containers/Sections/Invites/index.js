import React from "react";
import { useState } from "react";
import "antd/dist/antd.css";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { launchInviting } from "requests";
import { compareAsc, format } from 'date-fns'
import { Col, InputNumber, Row, Slider } from 'antd';
import GP from 'components/GroupsPicker'

const Links = ({ bots, parsedGroups }) => {
  const { t } = useTranslation();

  const [selectedBots, setSelectedBots] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]); // TODO: remove on invalidatiom  

  const [inputValue, setInputValue] = useState(20);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };

  const [hasStarted, setHasStarted] = useState(false);

  const [link, setLink] = useState(null);

  const sendRequest = async () => {
    if (selectedBots.length === 0 || selectedGroups.length === 0) {
      toast.error(`${t("COULD_NOT_RUN_MAILING")}: ${t("CHOOSE_ITEMS")}`);
      return;
    }

    setHasStarted(true);
    if (!link || link.length === 0) {
      toast.error(t("PROVIDE_LINK"));
      setHasStarted(false);
      return;
    }

    let res;
    try {
      res = await launchInviting({
        group_name: link,
        amount: inputValue,
        bots_to_use: selectedBots,
        recipient_groups: selectedGroups,
      });
      console.log('inviting res is', res)
    } catch(e) {
      toast.error(
        `${t("COULD_NOT_RUN_PARSING")}: ${e}`
      );
      setHasStarted(false);
      return
    }
    
    if (res && !res.detail && !res.error) {
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
        `${t("COULD_NOT_RUN_PARSING")}: ${res?.message || res?.detail?.msg || res?.detail || res?.error || "Something went wrong"}`
      );
    }

    setHasStarted(false);
  };

  const launchControls = (
    <div
      style={{
        paddingBottom: "50px",
        width: "800px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div style={{margin: '30px auto 20px auto'}}>
          <Row align="middle" justify="center">
          <div style={{fontSize:'11pt', marginRight: '10px'}}>{t('AMOUNT')}</div>
            <Col span={10}>
              <Slider
                min={1}
                max={200}
                onChange={onChange}
                value={typeof inputValue === 'number' ? inputValue : 0}
              />
            </Col>
            <Col style={{marginTop: '-10px'}} span={4}>
              <InputNumber
                min={1}
                max={200}
                style={{ margin: '0 16px' }}
                value={inputValue}
                onChange={onChange}
              />
            </Col>
          </Row>
          <div style={{opacity: 0.5, fontSize: '12pt', textAlign: "justify",
  textJustify: "inter-word", margin: '10px 60px'}}>{t('AMOUNT_INVITES_HELP')}</div>
        </div>
        <div style={{margin: '50px auto'}}>
        <Button disabled={hasStarted} onClick={sendRequest} type="primary">
          {t("ADD_MEMBERS")}
        </Button>
      </div>
    </div>
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <div style={{ width: "500px", margin: "10px auto" }}>
        <Input
          addonBefore="t.me/"
          onChange={(e) => {
            setLink(e.target.value);
          }}
          placeholder={t("TYPE_GROUP_LINK")}
        />
      </div>
      <GP 
        bots={bots}
        parsedGroups={parsedGroups}
        setSelectedBots={setSelectedBots}
        setSelectedGroups={setSelectedGroups}
      />
      {launchControls}
    </div>
  );
};

export default Links;
