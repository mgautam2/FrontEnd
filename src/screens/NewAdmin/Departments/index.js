import React from 'react';
import { CTFragment, CTHeading } from 'layout';
import { connectWithRedux } from '../controllers';
import './index.scss';

function DepartmentsWithRedux() {
  const headingProps = CTHeading.createProps({
    heading: 'Departments',
    sticky: true,
    gradient: true,
    offsetTop: 30
  });

  return (
    <CTFragment>
      <CTHeading {...headingProps} />
      <CTFragment padding={[0, 30]}>
        Here is Departments page
      </CTFragment>
    </CTFragment>
  );
}

export const Departments = connectWithRedux(
    DepartmentsWithRedux,
    []
);