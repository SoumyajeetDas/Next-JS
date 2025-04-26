import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

export default function NewMessagePage() {
  // async function createMessage(formData: FormData) {
  //   'use server';

  //   const message = formData.get('message');
  //   addMessage(message as string);

  //   // On demand revalidation
  //   revalidateTag('messages');
  //   redirect('/messages');
  // }

  return (
    <>
      <h2>New Message</h2>
      <form>
        <p className="form-control">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" required rows={5} />
        </p>

        <p className="form-actions">
          <button type="submit">Send</button>
        </p>
      </form>
    </>
  );
}
