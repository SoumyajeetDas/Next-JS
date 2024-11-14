// Even though this is a hook but it is getting executes as normal function in server side only

import { cookies } from 'next/headers';

const useServerDarkMode = (defaultTheme = 'dark') => {
  return cookies().get('theme')?.value ?? defaultTheme;
};

export default useServerDarkMode;
