import React from 'react';
import 'antd/dist/antd.css';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useTranslation } from 'react-i18next'


const { Dragger } = Upload;

const botsProps = {
  name: 'file',
  multiple: true,
  action: process.env.REACT_APP_API_URL + process.env.REACT_APP_API_UPLOAD_BOTS_ENDPOINT,
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const proxiesProps = {
  name: 'file',
  multiple: true,
  action: process.env.REACT_APP_API_URL + process.env.REACT_APP_API_UPLOAD_PROXIES_ENDPOINT,
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const App = () => {
  const { t } = useTranslation()
    
  return (
    <div style={{ width: '1000px', display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ width: '500px', padding: '10px' }}>
            <Dragger {...botsProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">{t('UPLOAD_BOTS')}</p>
            </Dragger>
        </div>
        <div style={{ width: '500px', padding: '10px' }}>
            <Dragger {...proxiesProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">{t('UPLOAD_PROXIES')}</p>
            </Dragger>
        </div>
    </div>
  );
}

export default App;