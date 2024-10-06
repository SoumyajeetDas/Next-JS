import Home from '../../src/app/page';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

describe('Home', () => {
  it('should have Home Page Text', () => {
    render(<Home />);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('should have a button with text Click Me', () => {
    render(<Home />);
    expect(
      screen.getByRole('button', { name: 'Click Me' }),
    ).toBeInTheDocument();
  });

  it('should have input field with label Enter Rando Text', () => {
    render(<Home />);
    expect(screen.getByLabelText('Enter Random Text:')).toBeInTheDocument();
  });

  it('should have input field with label Enter Specific Text', () => {
    render(<Home />);
    expect(screen.getByLabelText('Enter Specific Text:')).toBeInTheDocument();
  });

  it('should have input field with placeholder Search...', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });
});

describe('behaviour', () => {
  it('should show text when button is clicked', async () => {
    render(<Home />);
    const button = screen.getByRole('button', { name: 'Show Text' });

    expect(screen.queryByText('This is the text!')).not.toBeInTheDocument();
    await userEvent.click(button);

    // Both the way to handle async programming or maybe an action which will take a long time to complete
    // expect(
    //   await screen.findByText('This is the text!', {}, { timeout: 5000 }),
    // ).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText('This is the text!')).toBeInTheDocument();
      },
      { timeout: 1200 },
    );
  });
});
