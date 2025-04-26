import Messages, { MessageType } from '@/components/messages';

const callMe = async (): Promise<MessageType[]> => {
  // As this page.tsx will be the children of the layout.tsx, and revalidate:0 is added in the layout.tsx,
  // so this fetch will also be cached like the one in the layout.tsx

  // const response = await fetch(
  //   'https://6652d3e3813d78e6d6d6538e.mockapi.io/api/products',
  //   {
  //     next: {
  //       tags: ['messages'], // For on demand revaidation
  //     },
  //   },
  // );

  // The most interesting concept here will be if revalidate was not added in the layout.tsx at the global level, and would have been added in the fetch function
  // of the layout.tsx inside the component, then this fetch in the page.tsx would have been an independent one with no cache.
  // And if it was required to add cache we have add the code in the fetch function of this page.tsx, just like this

  // const response = await fetch(
  //   'https://6652d3e3813d78e6d6d6538e.mockapi.io/api/products',
  //   {
  //     next: {
  //       revalidate: 5,
  //     },
  //   }
  // );

  // OR

  // const response = await fetch(
  //   'https://6652d3e3813d78e6d6d6538e.mockapi.io/api/products',
  //   {
  //     cache: 'no-cache',
  //   },
  // );

  // The cache will work only for this fetch function.
  const response = await fetch('http://localhost:8080/messages', {
    // next: {
    //   revalidate: 5,
    // },
  });

  const messages = await response.json();
  return messages;
};

const MessagesPage = async () => {
  const messages = await callMe();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
};

export default MessagesPage;
