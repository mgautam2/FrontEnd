import React from 'react';
import { CTFragment } from 'layout';
import { connectWithRedux } from '../controllers';
import './index.scss';

function CoursesWithRedux() {
  return (
    <CTFragment padding={[0, 30]}>
      <div>
        Here is Courses page
      </div>
    </CTFragment>
  );
}

export const Courses = connectWithRedux(
    CoursesWithRedux,
    []
);