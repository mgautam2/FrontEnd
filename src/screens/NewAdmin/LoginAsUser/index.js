import React, { useState } from 'react';
import { CTFragment, CTHeading, CTForm, CTInput } from 'layout';
import { user } from 'utils';
import { connectWithRedux } from '../controllers';
import './index.scss';

function LoginAsUserWithRedux() {
  const headingProps = CTHeading.createProps({
    heading: 'Login As Account',
    sticky: true,
    gradient: true,
    offsetTop: 30
  });

  const [emailAddress, setEmailAddress] = useState('');

  const handleEmailInput = ({ target: { value }}) => setEmailAddress(value);

  const onSignIn = () => {
    user.loginAsAccountSignIn(emailAddress);
  };

  return (
    <CTFragment>
      <CTHeading {...headingProps} />
      <CTFragment padding={[0, 50]}>
        {user.isLoginAsAccount ? (
          <CTForm
            id="Login-As-User" 
            padding={[0, 30]}
            heading="Login As User"
            onSave={user.loginAsAccountSignOut}
            onSaveButtonText='Sign Out'
            className="loginAsUser-container"
          >
            <div>
              Signed in as <strong>{user.getLoginAsUserInfo().emailId}</strong>.
            </div>
          </CTForm>
        ) : (
          <CTForm
            id="Login-As-User" 
            padding={[0, 30]}
            heading="Login As User"
            details="Input Your Email Address"
            onSave={onSignIn}
            onSaveButtonText='Sign In'
            className="loginAsUser-container"
          >     
            <CTInput
              required
              id="email-address"
              label="Email"
              placeholder="Email Address"
              value={emailAddress}
              onChange={handleEmailInput}
            />
          </CTForm>
        )}
      </CTFragment>
    </CTFragment>
  );
}

export const LoginAsUser = connectWithRedux(
    LoginAsUserWithRedux,
    []
);