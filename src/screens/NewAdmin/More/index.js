import React from 'react';
import { CTFragment, CTHeading } from 'layout';
import { connectWithRedux } from '../controllers';
import './index.scss';

function MoreWithRedux() {
  const headingProps = CTHeading.createProps({
    heading: 'More',
    sticky: true,
    gradient: true,
    offsetTop: 30
  });

  return (
    <CTFragment>
      <CTHeading {...headingProps} />
      <CTFragment padding={[0, 30]}>
        Here is More page
      </CTFragment>
    </CTFragment>
  );
}

export const More = connectWithRedux(
    MoreWithRedux,
    []
);