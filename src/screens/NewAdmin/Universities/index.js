import React from 'react';
import { CTLayout, CTFragment } from 'layout';
import { connectWithRedux } from '../controllers';
import './index.scss';

function UniversitiesWithRedux() {
  const layoutProps = CTLayout.createProps({
    responsive: true,
    transition: true,
    headingProps: {
      heading: 'Example',
      icon: 'add'
    }
  });

  return (
    <CTFragment padding={[0, 30]}>
      <div>
        Here is Universities page
      </div>
    </CTFragment>
  );
}

export const Universities = connectWithRedux(
    UniversitiesWithRedux,
    []
);