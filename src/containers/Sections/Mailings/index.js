import React from "react";
import "antd/dist/antd.css";
import { Collapse } from "antd";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { fetchLogs } from "requests";
import toast from "react-hot-toast";

const { Panel } = Collapse;

const Mailings = ({ mailingsData }) => {
  const { t } = useTranslation();

  const downloadReport = (id) => {
    fetchLogs({
      mailingId: id,
    }).catch((e) => {
      toast.error(`${t("COULD_NOT_RUN_MAILING")}: ${e}`);
    });
  };

  return (
    <div style={{ width: "1200px", marginLeft: "auto", marginRight: "auto" }}>
      <Collapse>
        {mailingsData?.map((item) => {
          return (
            <Panel header={item.name} key={item.id}>
              {Object.keys(item).map((k) => {
                return <p key={k}>{t(k.toUpperCase()) + " : " + item[k]}</p>;
              })}
              {
                <Button
                  key={"btn"}
                  onClick={() => downloadReport(item.id)}
                  type="primary"
                >
                  {t("DOWNLOAD_REPORT")}
                </Button>
              }
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default Mailings;
