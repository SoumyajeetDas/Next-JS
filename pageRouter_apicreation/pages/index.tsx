import { useRef, useState } from 'react';

export default function Home() {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [feedbackItems, setFeedbackItems] = useState<
    { id: string; text: string }[]
  >([]);

  function submitFormHandler(event: { preventDefault: () => void }) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value ?? '';
    const enteredFeedback = feedbackInputRef.current?.value ?? '';

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    // If u don't give the domain it will automatically take the current domain
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function loadFeedbackHandler() {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
      });
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows={5} ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
