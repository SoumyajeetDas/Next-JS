import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  employees: [] as Array<{ id: string; name: string }>,
};

const employeeSlice = createSlice({
  name: 'employeeSlice',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<string>) => {
      const data = {
        id: nanoid(),
        name: action.payload,
      };

      state.employees.push(data);
    },

    removeEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (item) => item.id !== action.payload,
      );
      localStorage.setItem('emp', JSON.stringify(state.employees));
    },
  },
});

export default employeeSlice;
