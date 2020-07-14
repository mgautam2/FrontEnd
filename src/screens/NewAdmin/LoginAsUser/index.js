import React from 'react';
import { CTFragment } from 'layout';
import { connectWithRedux } from '../controllers';
import './index.scss';

function LoginAsUserWithRedux() {
  return (
    <CTFragment padding={[0, 30]}>
      <div>
        Here is LoginAsUser page
      </div>
    </CTFragment>
  );
}

export const LoginAsUser = connectWithRedux(
    LoginAsUserWithRedux,
    []
);