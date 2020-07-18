import React from 'react';
import { CTFragment, CTHeading } from 'layout';
import { connectWithRedux } from '../controllers';
import './index.scss';

function LoginAsUserWithRedux() {
  const headingProps = CTHeading.createProps({
    heading: 'Login As Account',
    sticky: true,
    gradient: true,
    offsetTop: 30
  });

  return (
    <CTFragment>
      <CTHeading {...headingProps} />
      <CTFragment padding={[0, 30]}>
        Here is LoginAsUser page
      </CTFragment>
    </CTFragment>
  );
}

export const LoginAsUser = connectWithRedux(
    LoginAsUserWithRedux,
    []
);