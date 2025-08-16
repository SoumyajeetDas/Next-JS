'use server';

export const addPost = async (
  prevState: any,
  formData: FormData,
): Promise<{
  message: string | null;
  email: string | null;
  password: string | null;
  inputEmail: string;
  inputPassword: string;
}> => {
  try {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email) {
      return {
        message: null,
        email: 'Email is required',
        password: null,
        inputEmail: formData.get('email') as string,
        inputPassword: formData.get('password') as string,
      };
    }

    if (!password) {
      return {
        message: null,
        email: null,
        password: 'Password is required',
        inputEmail: formData.get('email') as string,
        inputPassword: formData.get('password') as string,
      };
    }

    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
      }),
    });

    return {
      message: 'Success',
      email: null,
      password: null,
      inputEmail: formData.get('email') as string,
      inputPassword: formData.get('password') as string,
    };
  } catch (e) {
    return {
      message: 'Failed',
      email: null,
      password: null,
      inputEmail: formData.get('email') as string,
      inputPassword: formData.get('password') as string,
    };
  }
};
