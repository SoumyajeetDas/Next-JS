export type UserType = {
  id: number;
  name: string;
  age: number;
};

const getData = (): Promise<UserType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'John Doe', age: 22 },
        { id: 2, name: 'Jane Doe', age: 23 },
        { id: 3, name: 'John Smith', age: 24 },
      ]);
    }, 5000); // 5000 milliseconds = 5 seconds
  });
};

export default getData;
