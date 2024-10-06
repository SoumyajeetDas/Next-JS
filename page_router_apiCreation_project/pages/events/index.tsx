/**
 * As it shows all the events in the DB, so ideally this should also be SSG, but again the events can change but as it's not frequent
 * so ISR is the best choice here. And also we don't want to buld the app everytime so we will not use SSG
 */

import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { EventItem, getAllEvents } from '@/helpers/app-utils';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const AllEventsPage: React.FC<{ events: EventItem[] }> = ({ events }) => {
  const router = useRouter();

  const findEventHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>Events</title>
        <meta name="description" content="All Event Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;

export async function getStaticProps() {
  const allEvents = await getAllEvents();
  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
}
