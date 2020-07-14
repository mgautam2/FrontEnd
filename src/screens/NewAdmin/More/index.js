import React from 'react';
import { CTFragment } from 'layout';
import { connectWithRedux } from '../controllers';
import './index.scss';

function MoreWithRedux() {
  return (
    <CTFragment padding={[0, 30]}>
      <div>
        Here is More page
      </div>
    </CTFragment>
  );
}

export const More = connectWithRedux(
    MoreWithRedux,
    []
);