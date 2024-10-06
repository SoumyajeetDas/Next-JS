'use client';

import { employeeActions, useAppDispatch, useAppSelector } from '@/lib/store';
import React from 'react';
import styles from '../components/showEmp.module.css';

const DeleteEmployee = () => {
  const { employees } = useAppSelector((state) => state.employeeReducer);
  const dispatch = useAppDispatch();

  return (
    <>
      <h2>Delete Employee</h2>
      {employees?.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button
            className={styles.button}
            onClick={() => dispatch(employeeActions.removeEmployee(item.id))}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default DeleteEmployee;
