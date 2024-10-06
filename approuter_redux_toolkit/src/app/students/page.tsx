'use client';

import { studentActions, useAppDispatch, useAppSelector } from '@/lib/store';
import { useState } from 'react';

const Students = () => {
  const [std, setStd] = useState('');
  const dispatch = useAppDispatch();
  const { students } = useAppSelector((state) => state.studentReducer);
  //   store.dispatch(studentActions.addStudent('John Doe'));
  return (
    <>
      <h2>Register Students</h2>
      <input
        type="text"
        onChange={(e) => setStd(e.target.value)}
        placeholder="Register Students"
      />
      <br />
      <br />
      <button onClick={() => dispatch(studentActions.addStudent(std))}>
        Register
      </button>
      <h4>Show Students</h4>
      {students?.length &&
        students?.map((item) => <h5 key={item.id}>{item.name}</h5>)}
    </>
  );
};

export default Students;
