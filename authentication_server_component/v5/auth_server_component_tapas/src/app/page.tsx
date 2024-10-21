import Link from 'next/link';
import LoginForm from './component/LoginForm';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center m-4">
      <h1 className="text-3xl my-3">Hey, time to Sign In</h1>
      <LoginForm />

      <p className="my-3">
        Don&apos;t you have an account?
        <Link href="register" className="mx-2 underline">
          Register
        </Link>
      </p>
    </div>
  );
}