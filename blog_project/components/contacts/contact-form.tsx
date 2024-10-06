import ContactDetailsType from '@/@types/contactDetails.type';
import classes from './contact-form.module.css';

import React, { useEffect, useState } from 'react';
import Notification from '@/ui/notification';

const ContactForm = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState<
    'pending' | 'success' | 'error' | null
  >(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState<string | null>();

  async function sendContactData(contactDetails: ContactDetailsType) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }
  }

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(event: { preventDefault: () => void }) {
    event.preventDefault();

    // optional: add client-side validation

    setRequestStatus('pending');

    try {
      // Api calling
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus('success');
      setEnteredMessage('');
      setEnteredEmail('');
      setEnteredName('');
    } catch (error) {
      setRequestError((error as Error).message);
      setRequestStatus('error');
    }
  }

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  }

  return (
    <div>
      <section className={classes.contact}>
        <h1>How can I help you?</h1>
        <form className={classes.form} onSubmit={sendMessageHandler}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                required
                value={enteredEmail}
                onChange={(event) => setEnteredEmail(event.target.value)}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                required
                value={enteredName}
                onChange={(event) => setEnteredName(event.target.value)}
              />
            </div>
          </div>
          <div className={classes.control}>
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              rows={5}
              required
              value={enteredMessage}
              onChange={(event) => setEnteredMessage(event.target.value)}
            ></textarea>
          </div>

          <div className={classes.actions}>
            <button>Send Message</button>
          </div>
        </form>
        {notification && (
          <Notification
            status={notification.status as 'success' | 'error' | 'pending'}
            title={notification.title}
            message={notification.message as string}
          />
        )}
      </section>
    </div>
  );
};

export default ContactForm;
