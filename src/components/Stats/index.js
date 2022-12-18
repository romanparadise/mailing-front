import React from 'react';
import './index.css';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { useTranslation } from 'react-i18next';

const App = ({
  botsAlive,
  messagesSent,
  messageCost,
  botsDied,
  botsInWork
}) => {
  const {t} = useTranslation()

  return <div className="site-statistic-demo-card">
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic
            title={t('BOTS_ALIVE')}
            value={botsAlive ?? t('NO_DATA')}
            valueStyle={{ color: '#3f8600' }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t('MESSAGES_SENT')}
            value={messagesSent ?? t('NO_DATA')}
            valueStyle={{ color: '#3f8600' }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t('MESSAGE_COST')}
            value={messageCost ?? t('NO_DATA')}
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
            value={botsDied ?? t('NO_DATA')}
            valueStyle={{ color: '#cf1322' }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t('MESSAGES_PER_BOT')}
            value={(botsAlive && botsDied && messagesSent) ? (messagesSent+0.000001) / (botsAlive+botsDied) : t('NO_DATA')}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            // suffix={t('%')}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t('BOTS_IN_WORK') }
            value={botsInWork  ?? t('NO_DATA')}
            precision={0}
            valueStyle={{ color: '#cf1322' }}
            // suffix="%"
          />
        </Card>
      </Col>
    </Row>
  </div>
};

export default App;