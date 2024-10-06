import AuthForm from '@/components/auth-form';

// Remeber searchProps is a prop that is passed to any page. Layouts never receive serachParams prop.
// To know more check notes
export default async function Home({
  searchParams,
}: {
  searchParams: { mode: 'login' | 'signup' };
}) {
  const formMode = searchParams.mode || 'login';
  return <AuthForm mode={formMode} />;
}
