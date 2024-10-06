/**
 * The Home page should be SSG, bcoz we want the users to see the events on getting into the page, and that is a good user experience  and
 * also good SEO. SSR or CSR is not needed as the page is not duynamic and the data is not changing frequently.
 * Now if you thing more clearly there can be a chance that there is change in the number of events, and everytime if we need to
 * reflect the change we have to make a prod build. So the best thing here will be ISR as the change is not all frequent where the
 * revalidation should be a good amout of time as it's not needed that the page updation at real time is very necessary thing.
 */

import EventList from '@/components/events/event-list';
import { EventItem, getFeaturedEvents } from '@/helpers/app-utils';
import Head from 'next/head';
import React from 'react';

const Home: React.FC<{ events: EventItem[] }> = ({ events }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <EventList items={events} />
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
