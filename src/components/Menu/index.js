import React, { useState } from 'react';
import { CiMail } from 'react-icons/ci'
import { BsGeo } from 'react-icons/bs'
import { BiGroup } from 'react-icons/bi'
import { GrInProgress, GrUserNew } from 'react-icons/gr'
import { GiFinishLine, GiProgression } from 'react-icons/gi'
import { AiOutlinePlus, AiOutlineCloudUpload } from 'react-icons/ai'
import { MdOutlineWavingHand, MdOutlinePersonAddAlt } from 'react-icons/md'
import { VscNewFile, VscPersonAdd } from 'react-icons/vsc'
import { FiHelpCircle } from 'react-icons/fi'
import { Button, Menu } from 'antd';
import { useTranslation } from 'react-i18next';

function getItem(
  label,
  key,
  icon,
  children,
  type,
) {
  return {
	key,
	icon,
	children,
	label,
	type,
  };
}

const MainMenu = ({onChange}) => {
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(false);


	const items = [
		getItem(t('MENU_DASHBOARD'), 'MENU_DASHBOARD', <CiMail />, [
			getItem(t('MENU_MAILINGS_ENDED'), 'MENU_MAILINGS_ENDED', <GiFinishLine />),
			getItem(t('MENU_MAILINGS_IN_PROGRESS'), 'MENU_MAILINGS_IN_PROGRESS', <GiProgression />),
			getItem(t('MENU_MAILINGS_NEW'), 'MENU_MAILINGS_NEW', <AiOutlinePlus />),
		]),
		getItem(t('MENU_PARSING'), 'MENU_PARSING', <BiGroup />, [
			getItem(t('MENU_PARSING_GEO'), 'MENU_PARSING_GEO', <BsGeo />),
			getItem(t('MENU_PARSING_GROUP'), 'MENU_PARSING_GROUP', <BiGroup />),

		]),
		getItem(t('MENU_BOTS_N_PROXIES'), 'MENU_BOTS_N_PROXIES', <VscNewFile />, [
			getItem(t('MENU_BOTS_UPLOAD'), 'MENU_BOTS_UPLOAD', <AiOutlineCloudUpload />),
			getItem(t('MENU_BOTS_REGISTER'), 'MENU_BOTS_REGISTER', <MdOutlineWavingHand />),
		]),
		getItem(t('MENU_INVITES'), 'MENU_INVITES', <VscPersonAdd />),
		getItem(t('MENU_GUIDE'), 'MENU_GUIDE', <FiHelpCircle />),
	];

  return (
		<div style={{ width: 300 }}>
			<Menu
				defaultSelectedKeys={['MENU_MAILINGS_ENDED']}
				defaultOpenKeys={['MENU_DASHBOARD']}
				mode="inline"
				theme="light"
				inlineCollapsed={false}
				items={items}
				onSelect={(x)=>onChange(x.key)}
			/>
		</div>
  );
};

export default MainMenu;