'use client';

import { employeeActions, useAppDispatch, useAppSelector } from '@/lib/store';
import React from 'react';
import styles from './showEmp.module.css';

const EmployeeItems: React.FC = () => {
  const { employees } = useAppSelector((state) => state.employeeReducer);
  const dispatch = useAppDispatch();

  return (
    <>
      {employees?.map((item) => (
        <h4 key={item.id}>
          <span>{item.name}</span>
          <button
            className={styles.button}
            onClick={() => dispatch(employeeActions.removeEmployee(item.id))}
          >
            Delete
          </button>
        </h4>
      ))}
    </>
  );
};

export default EmployeeItems;
