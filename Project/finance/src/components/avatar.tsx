import React from 'react';
import { createClient } from '@/lib/supbase/server';
import { CircleUser } from 'lucide-react';
import Image from 'next/image';

const Avatar = async ({ width = 32, height = 32 }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: imageData } = supabase.storage
    .from('avatars')
    .getPublicUrl(user?.user_metadata?.avatar);

  if (!imageData) {
    return <CircleUser className="w-6 h-6" />;
  }

  return (
    <Image
      src={imageData.publicUrl}
      width={width}
      height={height}
      alt="User avatar"
      className="rounded-full"
    />
  );
};

export default Avatar;
