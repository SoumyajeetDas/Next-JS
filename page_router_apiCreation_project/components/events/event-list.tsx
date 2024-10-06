import React from 'react';
import EventItemPage from '../events/event-item';
import classes from './event-list.module.css';
import { EventItem } from '@/helpers/app-utils';

const EventList: React.FC<{ items: EventItem[] }> = (prop) => {
  const { items } = prop;
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItemPage
          key={event.id}
          id={event.id}
          title={event.title}
          image={event.image}
          date={event.date}
          location={event.location}
        />
      ))}
    </ul>
  );
};

export default EventList;
