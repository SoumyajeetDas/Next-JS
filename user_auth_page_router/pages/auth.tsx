import { useSession } from 'next-auth/react';
import AuthForm from '../components/auth/auth-form';
import { useRouter } from 'next/router';

function AuthPage() {
  // Client side Authentication
  // Redirect away if NOT authorized

  const { status } = useSession();
  const router = useRouter();

  // Client Side Page guard
  if (status === 'loading') {
    return <p>Loading...</p>;
  } else if (status === 'authenticated') {
    router.replace('/');
  }

  return <AuthForm />;
}

export default AuthPage;
