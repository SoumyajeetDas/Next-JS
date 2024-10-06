// Using Redux Toolkit in Page but should be client component

import React from 'react';
import styles from './showEmp.module.css';
import EmployeeItems from './EmployeeItems';

const ShowEmployee: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Show Employees</h2>
      <EmployeeItems />
    </div>
  );
};

export default ShowEmployee;
