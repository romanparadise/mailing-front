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
    "Location parsing - " + Date().toString().split("GMT")[0]
  );
  const [hasStarted, setHasStarted] = useState(false);

  const { t } = useTranslation();

  const sendParsingRequest = async () => {
    setHasStarted(true);
    if (pointsOnMap.length === 0) {
      toast.error(t("TAGS_LIST_IS_EMPTY"));
      return;
    }

    const res = await launchParsing({
      name: parsingName,
      points: pointsOnMap,
    });

    if (res && !res.error) {
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
      toast.error(
        `${t("COULD_NOT_RUN_PARSING")}: ${res?.error || "Something went wrong"}`
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
      <Input
        style={{ width: "100%" }}
        value={parsingName}
        onChange={(e) => setParsingName(e.target.value)}
      />
      <Button disabled={hasStarted} onClick={sendParsingRequest} type="primary">
        {t("PARSE")}
      </Button>
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
