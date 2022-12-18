import React from "react";
import "antd/dist/antd.css";
import { message, Upload, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Collapse } from 'antd';
import structureImage from './structure.jpg'
import { compareAsc, format } from 'date-fns'
import { Button } from "antd";

const { Panel } = Collapse;

const Requirements = () => {
  const { t } = useTranslation();

  const text = t('FILES_REQUIREMENTS')


  return (
    <div style={{width: '600px', margin: '35px auto'}}>
      <Collapse>
        <Panel header={t("SHOW_REQUIREMENTS")}>
          <img alt='help' src={structureImage}></img>
          <p>{text}</p>
        </Panel>
      </Collapse>
    </div>
  )
}

const BotsNProxies = () => {
  const [botsFile, setBotsFile] = useState();
  const [proxiesFile, setProxiesFile] = useState();
  //const [botsName, setBotsName] = useState("");
  const { t } = useTranslation();

  function handleBotsChange(event) {
    setBotsFile(event.target.files[0]);
  }

  function handleProxiesChange(event) {
    setProxiesFile(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!botsFile || !proxiesFile/* || !botsName*/) {
      toast.error(`${t("UPLOAD_BOTH_FILES")}`);
      return;
    }

    // const botsFileBlob = new Blob([botsFile], {
    //       // This will set the mimetype of the file
    //       type: "application/zip"
    //     });
    // //const BlobName = botsFile.name;

    // const proxiesFileBlob = new Blob([proxiesFile], {
    //   // This will set the mimetype of the file
    //   type: "text/plain"
    // });

    // const url =
    //   process.env.REACT_APP_API_BASE_URL + '/' +
    //   process.env.REACT_APP_API_UPLOAD_FILES_ENDPOINT
      

    var formdata = new FormData();
    formdata.append("bots", botsFile);
    formdata.append("proxies", proxiesFile);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      mode: "cors",
    };
    
    fetch(`${process.env.REACT_APP_API_BASE_URL}/uploadBots`, requestOptions)
      .then(() => {
          toast(t("FILES_UPLOADED"), {
            icon: "💃🏼",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        })
      .catch(error => {
        console.log('upload bots error', error)
        toast.error(
          `${t("COULD_NOT_UPLOAD")}: ${error.toString() || "Something went wrong"}`
        );
      });
    // const formData = new FormData();
    // formData.append("bots", botsFileBlob);
    // formData.append("proxies", proxiesFileBlob);// can specify filename as 3rd parameter

    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };

    // axios
    //   .post(url, formData, config)
    //   .then((res) => {
    //       toast(res.message, {
    //         icon: "👏",
    //         style: {
    //           borderRadius: "10px",
    //           background: "#333",
    //           color: "#fff",
    //         },
    //       });
    //   })
    //   .catch((e) => {
    //     toast.error(
    //       `${t("COULD_NOT_UPLOAD")}: ${e.message || "Something went wrong"}`
    //     );
    //   });
  };

  return (
    <div>
      <Requirements />
      <form
        style={{
          fontSize: "15pt",
          textAlign: "center",
          margin: "0 auto",
          width: "700px",
        }}
        onSubmit={handleSubmit}
      >
        <div
          className="text-center"
          style={{ textAlign: "left", width: "100%", marginBottom: '20px' }}
        >
          <div style={{ color: "#333", fontWeight: "light", width: "400px" }}>
            {t("UPLOAD_BOTS")}
          </div>
          <input type="file" onChange={handleBotsChange} />
        </div>
        <div
          className="text-center"
          style={{ textAlign: "left", display: "flex", width: "100%" }}
        >
          <div style={{ color: "#333", fontWeight: "light", width: "400px" }}>
            {t("UPLOAD_PROXIES")}
          </div>
          <input type="file" onChange={handleProxiesChange} />
        </div>

        {/* <div style={{ width: "100%", margin: "20px" }}>
          {t("ENTER_BOTS_GROUP_NAME")}
          <Input
            style={{ width: "500px" }}
            value={botsName}
            onChange={(e) => setBotsName(e.target.value)}
          />
        </div> */}

        <button style={{margin: '60px'}} className="ant-btn ant-btn-primary" type="submit">
          {t("UPLOAD")}
        </button>
      </form>
    </div>
  );

  // return (
  //   <div style={{ width: '1000px', display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}>
  //       <div style={{ width: '500px', padding: '10px' }}>
  //           <Dragger {...botsProps}>
  //               <p className="ant-upload-drag-icon">
  //                 <InboxOutlined />
  //               </p>
  //               <p className="ant-upload-text">{t('UPLOAD_BOTS')}</p>
  //           </Dragger>
  //       </div>
  //       <div style={{ width: '500px', padding: '10px' }}>
  //           <Dragger {...proxiesProps}>
  //               <p className="ant-upload-drag-icon">
  //                 <InboxOutlined />
  //               </p>
  //               <p className="ant-upload-text">{t('UPLOAD_PROXIES')}</p>
  //           </Dragger>
  //       </div>
  //   </div>
  // );
};

export default BotsNProxies;
