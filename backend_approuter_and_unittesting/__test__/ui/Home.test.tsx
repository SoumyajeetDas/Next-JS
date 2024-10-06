import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

it('check', () => {
  render(<Home />);

  expect(screen.getByText('Get started by editing')).toBeInTheDocument();
});
