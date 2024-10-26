// This is used for middleware. Middleware part will be executed first and at that time there will be no Model and all that will be used.
// Remember Middleware only needs the session in the authconfig to work.
// Ref : https://www.youtube.com/watch?v=jHrjnZM26i4&list=PLIJrr73KDmRwz_7QUvQ9Az82aDM9I8L_8&index=18&t=1873s

export const authConfig = {
  session: {
    strategy: 'jwt',
  },
  providers: [],
};
