import React, { useRef } from 'react';
import Button from '../ui/button';
import classes from './event-search.module.css';

const EventsSearch: React.FC<{
  onSearch: (selectedYear: string, selectedMonth: string) => void;
}> = (props) => {
  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);

  const submitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const selectedYear = yearInputRef.current!.value;
    const selectedMonth = monthInputRef.current!.value;

    props.onSearch(selectedYear, selectedMonth);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthInputRef}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
          </select>
        </div>
      </div>
      <Button>Find events</Button>
    </form>
  );
};

export default EventsSearch;
