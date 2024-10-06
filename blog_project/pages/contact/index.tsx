import ContactForm from '@/components/contacts/contact-form';
import Head from 'next/head';
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Contact Form" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ContactForm />
    </>
  );
};

export default ContactPage;
