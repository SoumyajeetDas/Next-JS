import Head from 'next/head';
import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

type PropTypes = {
  products: { id: number; title: string; description: string }[];
};

// The props comes up from the getStsticProps function. This function component gets excuted aftre getStaticProps() gets executed.
const Home: React.FC<PropTypes> = (props) => {
  console.log('I am getting prerendered in Home Compo');

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {props.products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

// This function gets called at build time and only gets executed on the server side.
// It won't even be included in the JS bundle that gets sent to the browser.
// When this file starts getting executed getStaticProps() function first gets executed and then the component gets executed.
export async function getStaticProps(): Promise<{
  props?: { products: { id: number; name: string }[] };
  revalidate?: number;
  notFound?: boolean;
  redirect?: string;
}> {
  console.log('I am getting prerendered in getStaticProps');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  // If the data is empty then we can return notFound: true. This will show the 404 page.
  if (data.products.length === 0) {
    return { notFound: true };
  }

  // If we are not gettig data from backend redirect to the no-data page which we have not created
  if (!data) {
    return { redirect: '/no-data' };
  }

  // Along with props we can also return revalidate, notFound and redirect. This will tell next.js to re-generate the page after 10 seconds.
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
    // notFound: false, // notFound will take core whether to show the 404 page or not.
    // redirect: '/no-data', // redirect will take care whether to redirect to the page or not.
  };
}

export default Home;
