import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  function registrationHandler(event: { preventDefault: () => void }) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    // During API calling domain name is not required as this will be running on the same server with frontend next JS
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: emailInputRef.current!.value }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
