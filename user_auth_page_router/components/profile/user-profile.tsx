import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  // Client side Authentication
  // Redirect away if NOT authorized

  // const { status } = useSession();
  // const router = useRouter();

  // // Client Side Page guard
  // if (status === 'loading') {
  //   return <p className={classes.profile}>Loading...</p>;
  // } else if (status === 'unauthenticated') {
  //   router.replace('/auth');
  // }

  // We have the server side authentication on the profile.tsx

  async function changePasswordHandler(passwordData: {
    oldPassword: string;
    newPassword: string;
  }) {
    const response = await fetch('/api/user/changePassword', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
