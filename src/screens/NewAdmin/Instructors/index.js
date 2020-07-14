import React from 'react';
import { CTFragment } from 'layout';
import { connectWithRedux } from '../controllers';
import './index.scss';

function InstructorsWithRedux() {
  return (
    <CTFragment padding={[0, 30]}>
      <div>
        Here is Instructor page
      </div>
    </CTFragment>
  );
}

export const Instructors = connectWithRedux(
    InstructorsWithRedux,
    []
);