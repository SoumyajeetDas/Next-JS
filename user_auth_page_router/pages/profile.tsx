/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getServerSession } from 'next-auth';
import UserProfile from '../components/profile/user-profile';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  // I had to use this useSession, because when I am logging out from the profile page, it is not redirecting to the login page.
  const { data: session } = useSession();

  const router = useRouter();

  if (!session) {
    router.replace('/auth');
    return;
  }
  return <UserProfile />;
};

// @ts-ignore
export async function getServerSideProps({ req, res }) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const user = {
    ...session.user,
    name: session.user?.name || null,
    image: session.user?.image || null,
  };

  // session contain important data that should not be passed or accessed in the client. So it will not be passed as prop in the session.
  // To pass as props you can create a new object and pass it as props. Like here created clientData object and passed it as props.
  // Ref : https://stackoverflow.com/questions/61314910/props-passed-to-page-from-getserversideprops-is-always-undefined
  const clientData = {
    ...session,
    user: {
      ...session.user,
      ...user,
    },
  };

  return {
    props: {
      clientData,
    },
  };
}

export default ProfilePage;
