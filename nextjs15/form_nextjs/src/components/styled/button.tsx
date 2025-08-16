import React, { ComponentProps } from 'react';
import { Button } from '../ui/button';
import { useFormStatus } from 'react-dom';

const ButtonStyled: React.FC<ComponentProps<typeof Button>> = ({
  type,
  children,
}) => {
  // You get the pending state with useActionState(). Why to use all these ??
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type={type}>
      {children}
    </Button>
  );
};

export default ButtonStyled;
