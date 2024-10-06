'use client';

import FormSubmit from '@/components/formSubmit';
import { submitHandler } from '@/lib/action';
import { useFormState } from 'react-dom';

export interface PostType {
  userId: string;
  title: string;
  imageUrl: string;
  content: string;
}

const NewPostPage = () => {
  const initialState = {
    message: {
      title: '',
      image: '',
      content: '',
    },
  };

  const [state, formAction] = useFormState(submitHandler, initialState);

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
          <b style={{ color: 'red' }}>{state.message.title}</b>
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
          <b style={{ color: 'red' }}>{state.message.image}</b>
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={5} />
          <b style={{ color: 'red' }}>{state.message.content}</b>
        </p>

        {/* Used useFormStatus() hook within this component */}
        <FormSubmit />
      </form>
    </>
  );
};

export default NewPostPage;
