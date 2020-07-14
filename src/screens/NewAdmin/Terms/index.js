import React from 'react';
import { CTFragment } from 'layout';
import { connectWithRedux } from '../controllers';
import './index.scss';

function TermsWithRedux() {
  return (
    <CTFragment padding={[0, 30]}>
      <div>
        Here is Terms page
      </div>
    </CTFragment>
  );
}

export const Terms = connectWithRedux(
    TermsWithRedux,
    []
);