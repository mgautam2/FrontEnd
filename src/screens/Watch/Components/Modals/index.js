import React, { useEffect, useState } from 'react';
import {
  connectWithRedux,
  modalControl,
  MODAL_HIDE,
  MODAL_SHARE,
  MODAL_BEFORE_HIDE,
} from '../../Utils';

import { handleCookies } from '../../../../utils/handle-cookies';
import EmbedModal from './EmbedModal'
import IntroModal from './IntroModal'
import ShareModal from './ShareModal';
import './index.css';

function ModalsWithRedux({ modal = MODAL_HIDE, setModal }) {
  // Register setMenu to menuControl
  useEffect(() => {
    modalControl.register({ setModal });
  }, []);

  const handleClose = () => {
    modalControl.close();
  };

  const [embed, setEmbed] = useState(false);
  const [intro, setIntro] = useState(handleCookies.getCookie("visited") !== "yes");
  //handleCookies.checkCookie()


  const hideBefore = modal === MODAL_BEFORE_HIDE;

  return (
    <>
      <div className="watch-modal" data-modal-type={modal}>
        {(modal === MODAL_SHARE || hideBefore) &&
          <ShareModal onClose={handleClose} embed={embed} setEmbed={setEmbed} />}
        <div className="wml-filter" onClick={handleClose} />
      </div>
      {
        embed
        &&
        <EmbedModal onClose={() => setEmbed(false)} />
        
      }

      {
        intro
        &&
        <IntroModal onClose={() => {setIntro(false); handleCookies.setCookie("visited", "yes", 365);}} /> 
        
      }
       
    </>
  );
}

export const Modals = connectWithRedux(
  ModalsWithRedux, 
  ['modal'], 
  ['setModal']
);
