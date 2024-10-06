'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import styles from './addEmp.module.css';
import { employeeActions, useAppDispatch } from '@/lib/store';

const AddEmployee: React.FC = () => {
  const [empName, setEmpName] = useState('');
  const dispatch = useAppDispatch();

  const dataDispatch = () => {
    // console.log(empName)
    dispatch(employeeActions.addEmployee(empName));
    setEmpName('');
  };

  // store.dispatch(employeeActions.addEmployee('John Doe'));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add Employees</h2>
      <input
        className={styles.input}
        value={empName}
        onChange={(e) => setEmpName(e.target.value)}
        type="text"
        placeholder="Enter Employee Data"
      />
      <button onClick={dataDispatch} className={styles.button}>
        Add
      </button>
      <Link href="/delete-employee">Delete</Link>
    </div>
  );
};

export default AddEmployee;
