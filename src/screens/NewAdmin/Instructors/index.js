import React from 'react';
import { CTFragment, CTHeading } from 'layout';
import { connectWithRedux } from '../controllers';
import './index.scss';

function InstructorsWithRedux() {
  const headingProps = CTHeading.createProps({
    heading: 'Instructors',
    sticky: true,
    gradient: true,
    offsetTop: 30
  });

  return (
    <CTFragment>
      <CTHeading {...headingProps} />
      <CTFragment padding={[0, 30]}>
        Here is Instructor page
      </CTFragment>
    </CTFragment>
  );
}

export const Instructors = connectWithRedux(
    InstructorsWithRedux,
    []
);