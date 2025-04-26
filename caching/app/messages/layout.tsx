// Revalidate the cache after 30 seconds in the Router level. As present in the layout.tsx so will affect all the children of this layout.tsx
// export const revalidate = 30;

const dataFetching = async (): Promise<number> => {
  /**
   * force-cache is by default
   */

  // const response = await fetch('http://localhost:8080/messages', {
  //   cache: 'force-cache',
  // });

  /**
   * no-cache will not cache the response
   */

  // const response = await fetch('http://localhost:8080/messages', {
  //   cache: 'no-cache',
  // });

  /**
   * The cache will work only for this fetch function. Here as I have given revalidate:0, it basically will work as cache: no-cache.
   */

  // const response = await fetch(
  //   'https://6652d3e3813d78e6d6d6538e.mockapi.io/api/products',
  //   {
  //     next: {
  //       revalidate: 0,
  //     },
  //   },
  // );

  /**
   * Added revalidate at the top level of the page, and will be added just like the next : { revalidate: 0} just like in the top.
   * And as it is layout.tsx all the children under this layout will have the revalidate value as 0.
   */
  // const response = await fetch(
  //   'https://6652d3e3813d78e6d6d6538e.mockapi.io/api/products',
  //   {
  //     next: {
  //       tags: ['messages'], // For on demand revaidation
  //     },
  //   },
  // );

  // The cache will work only for this fetch function.
  const response = await fetch('http://localhost:8080/messages', {
    next: {
      revalidate: 4,
    },
  });

  const messages = await response.json();
  const totalMessages = messages.length;

  return totalMessages;
};

const MessagesLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const totalMessages = await dataFetching();

  return (
    <>
      <h1>Important Messages</h1>
      <p>{totalMessages} messages found</p>
      <hr />
      {children}
    </>
  );
};

export default MessagesLayout;
