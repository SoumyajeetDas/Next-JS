import React from 'react';
import { createClient } from '@/lib/supbase/server';

const Page = async () => {
  // const supabase = createClient();
  // const {
  //   data: {
  //     user: { user_metadata: defaults },
  //   },
  // } = await supabase.auth.getUser();
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Settings</h1>
    </>
  );
};

export default Page;
