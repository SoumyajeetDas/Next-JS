import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  students: [] as Array<{ id: string; name: string }>,
};

const studentsSlice = createSlice({
  name: 'studentsReducer',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      const data = {
        id: nanoid(),
        name: action.payload,
      };

      state.students.push(data);
    },

    removeStudent: (state, action) => {
      state.students = state.students.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

export default studentsSlice;
