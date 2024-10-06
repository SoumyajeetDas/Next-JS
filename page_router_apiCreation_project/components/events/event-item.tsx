import Link from 'next/link';
import React from 'react';
import classes from './event-item.module.css';
import Button from '../ui/button';
import { EventItem } from '@/helpers/app-utils';

const EventItemPage: React.FC<Omit<EventItem, 'description' | 'isFeatured'>> = (
  prop,
) => {
  const { id, title, image, date, location } = prop;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');
  return (
    <li className={classes.item}>
      <img src={'/' + image} alt="Loading..." />
      <div className={classes.content}>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={`/events/${id}`}>Explore Event</Button>
        </div>
      </div>
    </li>
  );
};

export default EventItemPage;
