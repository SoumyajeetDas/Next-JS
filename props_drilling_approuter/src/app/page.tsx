import Card from '@/components/Card';
import getData from '../lib/getData';

export default async function Home() {
  const users = await getData();
  console.log('Home');

  return (
    <>
      {users.map((user) => (
        <Card key={user.id} user={user} />
      ))}
    </>
  );
}
