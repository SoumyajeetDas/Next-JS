/* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

import Link from 'next/link';
import React from 'react';
import styles from './addEmp.module.css';
import store, { employeeActions } from '@/lib/store';

const AddEmployee: React.FC = async () => {
  store.dispatch(employeeActions.addEmployee('John Doe'));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add Employees</h2>

      <Link href="/delete-employee">Delete</Link>
    </div>
  );
};

export default AddEmployee;
