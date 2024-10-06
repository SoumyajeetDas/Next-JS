import { useContext, useRef } from 'react';
import classes from './newsletter-registration.module.css';
import { NotificationContext } from '@/store/notification-content';

function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event: { preventDefault: () => void }) {
    event.preventDefault();

    notificationCtx!.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });

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
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then(() => {
        notificationCtx!.showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter!',
          status: 'success',
        });
      })
      .catch((error) => {
        notificationCtx!.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        });
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
