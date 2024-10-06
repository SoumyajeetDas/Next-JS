/**
 * Here any combination of page can be requested by the user based on the filter, so basically we don't know which ones to pre render
 * so the best will SSR. And also the page content can change not frequently but can change, so we can't make it totally static.
 *
 * We can also use CSR here as it's not much imp wrt SEO.
 */

import EventList from '@/components/events/event-list';
import { EventItem, getFilteredEvents } from '@/helpers/app-utils';
import Head from 'next/head';
import React from 'react';

interface FilteredEventsPageProps {
  events: EventItem[];
  hasError?: boolean;
}

const FilteredEventsPage: React.FC<FilteredEventsPageProps> = (props) => {
  // If the slug doesn't contain a valid year or month value then numYear or numMonth will be NaN
  if (props?.hasError) {
    return <h1>Invalid Filter. Please adjust your values</h1>;
  }

  return (
    <>
      <Head>
        <title>Filtered Events</title>
        <meta name="description" content="Filtered Events Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EventList items={props.events} />
    </>
  );
};

export default FilteredEventsPage;

export async function getServerSideProps(context: {
  params: { slug: string[] };
}) {
  const filterData = context.params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear; // Convert it to number
  const numMonth = +filteredMonth; // Convert it to number

  // If the slug doesn't contain a valid year or month value then numYear or numMonth will be NaN
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    // We could have also sent here redirect
    // return {
    //   props: { redirect: '/error' },
    // };
    // }

    return {
      props: { events: [], hasError: true },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (filteredEvents.length === 0) {
    return {
      props: { events: [], hasError: true },
    };
  }

  return {
    props: {
      events: filteredEvents,
    },
  };
}
