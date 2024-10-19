import React from 'react';
import SocialLogin from './SocialLogin';
import CredentialLogin from './CredentialLogin';

const LoginForm = () => {
  return (
    <>
      <CredentialLogin />
      <SocialLogin />
    </>
  );
};
export default LoginForm;
