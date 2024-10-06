// Using Redux Toolkit in Page but should be client component

import React from 'react';
import styles from './showEmp.module.css';
import store from '@/lib/store';

const ShowEmployee: React.FC = () => {
  const employees = store.getState().employeeReducer.employees;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Show Employees</h2>
      {employees?.map((item) => (
        <h4 key={item.id}>
          <span>{item.name}</span>
          {/* <button
            className={styles.button}
            onClick={() => storedispatch(employeeActions.removeEmployee(item.id))}
          >
            Delete
          </button> */}
        </h4>
      ))}
    </div>
  );
};

export default ShowEmployee;
