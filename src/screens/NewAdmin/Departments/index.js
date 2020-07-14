import React from 'react';
import { CTFragment } from 'layout';
import { connectWithRedux } from '../controllers';
import './index.scss';

function DepartmentsWithRedux() {
  return (
    <CTFragment padding={[0, 30]}>
      <div>
        Here is Departments page
      </div>
    </CTFragment>
  );
}

export const Departments = connectWithRedux(
    DepartmentsWithRedux,
    []
);