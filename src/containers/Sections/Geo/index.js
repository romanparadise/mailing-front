import LocationPicker from "react-leaflet-location-picker";
import { useState } from "react";
import { Input, Button } from "antd";
import "./styles.css";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { launchParsing } from "requests";

const Geo = () => {
  const [pointsOnMap, setPointsOnMap] = useState([]);
  const [parsingName, setParsingName] = useState(
    Math.round(Math.random()*1000000).toString()//"Location parsing - " + Date().toString().split("GMT")[0]
  );
  const [hasStarted, setHasStarted] = useState(false);

  const { t } = useTranslation();

  const sendParsingRequest = async () => {
    setHasStarted(true);
    if (pointsOnMap.length === 0) {
      toast.error(t("TAGS_LIST_IS_EMPTY"));
      return;
    }

    let res;

    try {
      res = await launchParsing({
        name: parsingName,
        points: pointsOnMap,
      });
    } catch(e) {
      toast.error(
        `${t("COULD_NOT_RUN_PARSING")}: ${e}`
      );
      setHasStarted(false);
      return
    }

    if (res && res.message.includes('success')) {
      setPointsOnMap([]);
      toast(t("PARSING_STARTED"), {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      console.log('error: ', res)
      toast.error(
        `${t("COULD_NOT_RUN_PARSING")}: ${res?.message || res?.detail?.msg || "Something went wrong"}`
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
      {/* <Input
        style={{ width: "100%" }}
        value={parsingName}
        onChange={(e) => setParsingName(e.target.value)}
      /> */}
      <div style={{margin: '0 auto'}}>
        <Button disabled={hasStarted} onClick={sendParsingRequest} type="primary">
          <span>{t("PARSE")}</span>
        </Button>
      </div>
    </div>
  );

  const pointMode = {
    banner: true,
    control: {
      values: pointsOnMap,
      onClick: (point) =>
        setPointsOnMap((prevPoints) => [...prevPoints, point]),
      onRemove: (point) =>
        setPointsOnMap((prevPoints) => prevPoints.filter((p) => p !== point)),
    },
  };
  const circleMode = {
    banner: true,
  };

  return (
    <>
      <div style={{ transitionDuration: "1s" }}>
        <LocationPicker
          showInputs={false}
          pointMode={pointMode}
          circleMode={circleMode}
        />
      </div>
      {launchControls}
    </>
  );
};

export default Geo;
