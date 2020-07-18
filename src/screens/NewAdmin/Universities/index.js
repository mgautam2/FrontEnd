import React from 'react';
import { CTLayout, CTFragment, CTHeading } from 'layout';
import { connectWithRedux } from '../controllers';
import './index.scss';

function UniversitiesWithRedux() {
  const headingProps = CTHeading.createProps({
    heading: 'Universities',
    sticky: true,
    gradient: true,
    offsetTop: 30
  });

  return (
    <CTFragment>
      <CTHeading {...headingProps} />
      <CTFragment padding={[0, 30]}>
        Here is Universities page
      </CTFragment>
    </CTFragment>
  );
}

export const Universities = connectWithRedux(
    UniversitiesWithRedux,
    []
);