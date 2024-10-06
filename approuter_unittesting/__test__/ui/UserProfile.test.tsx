import { render, screen } from '@testing-library/react';
import UserProfile from '../../src/components/UserProfile';
import * as React from 'react';
import '@testing-library/jest-dom';

describe('UserProfile', () => {
  it('should have text Email Verified when isEmailVerified is true', () => {
    render(
      <UserProfile
        displayName="Anson The Developer"
        username="ansonthedev"
        email="ansonthedev@ansonthedev.com"
        isEmailVerified={true}
      />,
    );

    expect(screen.getByText('Email Verified')).toBeInTheDocument();
  });

  it('should have text Email Not Verified when isEmailVerified is false', () => {
    render(
      <UserProfile
        displayName="Anson The Developer"
        username="ansonthedev"
        email={'ansonthedev@ansonthedev.com'}
        isEmailVerified={false}
      />,
    );

    expect(screen.getByText('Email Not Verified')).toBeInTheDocument();
  });
});
