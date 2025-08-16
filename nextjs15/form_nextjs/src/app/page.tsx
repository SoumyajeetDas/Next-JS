'use client';
import { addPost } from '@/actions/post';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useActionState } from 'react';

const initialState = {
  message: null,
  email: null,
  password: null,
  inputEmail: '',
  inputPassword: '',
};

export default function Home() {
  // useFormState is obsolete
  // const [state, formAction] = useFormState(addPost, initialState);

  const [state, formAction, isPending] = useActionState(addPost, initialState);
  return (
    <div className="container py-8">
      <form
        className="space-y-8 mx-auto max-w-2xl shadow-xl border-2 rounded-2xl p-8"
        action={formAction}
      >
        {state.message && (
          <Alert className="bg-green-100">
            <AlertTitle>Success! Your changes have been saved</AlertTitle>
            <AlertDescription>
              This is an alert with icon, title and description.
            </AlertDescription>
          </Alert>
        )}
        <div className="flex flex-col gap-10">
          <div>
            <Input
              className="m-0"
              name="email"
              placeholder="Please enter email"
              defaultValue={state?.inputEmail}
            />
            {state.email && (
              <Label className="text-sm text-red-500">{state.email}</Label>
            )}
          </div>

          <div>
            <Input
              name="password"
              placeholder="Please enter password"
              type="password"
              defaultValue={state?.inputPassword}
            />
            {state.password && (
              <Label className="text-sm text-red-500">{state.password}</Label>
            )}
          </div>
        </div>

        {/* <ButtonStyled type="submit">Submit</ButtonStyled> */}
        <Button disabled={isPending} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
