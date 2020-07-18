import React from 'react';
import { CTFragment, CTHeading } from 'layout';
import { connectWithRedux } from '../controllers';
import './index.scss';

function TermsWithRedux() {
  const headingProps = CTHeading.createProps({
    heading: 'Terms',
    sticky: true,
    gradient: true,
    offsetTop: 30
  });

  return (
    <CTFragment>
      <CTHeading {...headingProps} />
      <CTFragment padding={[0, 30]}>
        Here is Terms page
      </CTFragment>
    </CTFragment>
  );
}

export const Terms = connectWithRedux(
    TermsWithRedux,
    []
);