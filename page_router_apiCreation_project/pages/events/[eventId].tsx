/**
 * This page contains details of each and every event, So, this will be very imp from SEO perspective, so definitely we need SSG here. But
 * again the date might change but not very frequently and that is very important to reflect the change in the page as well. So, ISR is the
 *  best choice here. So, we will go with ISR here. And the revalidate time should be lesser time as compared to the home page, as the
 * updation is very important here.
 */

import EventContent from '@/components/event-detail/event-content';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventSummary from '@/components/event-detail/event-summary';
import Comments from '@/components/input/comments';
import { getEventById } from '@/dummy-data';
import { EventItem, getFeaturedEvents } from '@/helpers/app-utils';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const EventDetailsPage: React.FC<{ event: EventItem }> = ({ event }) => {
  // As we are using fallback to true so we need to wait for the props to get loaded during pre rendering.
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Head>
        <title>Event Details</title>
        <meta name="description" content="Event Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>

      <Comments eventId={event.id} />
    </>
  );
};

export default EventDetailsPage;

// Get all the params from getStaticPaths
export async function getStaticProps(context: { params: { eventId: string } }) {
  const eventId = context.params.eventId;
  const event = getEventById(eventId);

  // If event cannot be found then return 404 page.
  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  // Retrive al the paths wrt to the ids and send that to the getStaticProps. Here all the paths will be those data having
  // isFeatured: true. The biggest reason is this page comes up from index.tsx in the pages folder that is the landing page and
  // will be the entery point of the users. So, it's good that we prerender the pages only those pages.
  const allEvents = await getFeaturedEvents();

  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: true, // As we are placing only the events where isFeatured is true, so we can need fallback to true, so that it doesn't
    // throw 404 error.
  };
}
