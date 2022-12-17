import React from "react";
import LanguageSwitch from "components/LanguageSwitch";


const Header = ({contents}) => {
  return (
    <header style={{background: '#333336', height: '40px', color: '#FFF', display: 'flex', position: 'relative'}}>
      <div style={{fontSize: '20px', lineHeight: '40px', textAlign: 'center', margin: '0 auto'}}>{contents}</div>
      <LanguageSwitch />
    </header>
  );
};

export default Header;
