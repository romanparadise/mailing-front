import React from 'react';
import './index.css';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { useTranslation } from 'react-i18next';

const App = () => {
  const {t} = useTranslation()

  return <div className="site-statistic-demo-card">
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic
            title={t('BOTS_ALIVE')}
            value={1128}
            valueStyle={{ color: '#3f8600' }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t('MESSAGES_SENT')}
            value={1003}
            valueStyle={{ color: '#3f8600' }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t('MESSAGE_COST')}
            value={0.01}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            suffix={t('$')}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t('BOTS_DIED')}
            value={93}
            valueStyle={{ color: '#cf1322' }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t('SURVIVAL_RATE')}
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            suffix={t('%')}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t('BOTS_IN_WORK')}
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
  </div>
};

export default App;