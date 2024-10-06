import path from 'path';
import React from 'react';
import fs from 'fs/promises';
// import { useParams } from 'next/navigation';

type ProductType = {
  id: string;
  title: string;
  description: string;
};

// The props comes up from the getStaticProps function. This function component gets excuted aftre getStaticProps() gets executed.
const ProductDetailPage: React.FC<{
  loadedProduct: { title: string; description: string };
}> = (props) => {
  // const router = useParams();

  const { loadedProduct } = props;

  // This will be a fallback when fallback is true in getStaicPaths() as the page is renderd on the fly the props data takes time
  // to load so we can show loading text.
  if (!loadedProduct) {
    console.log('loading');
    return <p>Loading...</p>;
  }

  // This will be a fallback whe there is no getStaticProps present in the file. As the page is renderd on the fly the props data takes time
  // to load so we can show loading text.

  // if (!router?.pid) {
  //   return <h2>Loading...</h2>;
  // }

  return (
    <div>
      {/* <h1>{router.pid}</h1> */}

      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </div>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data: { products: ProductType[] } = JSON.parse(jsonData.toString());

  return data;
};

// getStaticProps() gets the dynamic params from getStaticPaths() function.
export async function getStaticProps({ params }: { params: { pid: string } }) {
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((prod) => prod.id === productId);

  // As fallback is true we need to add this condition to get the not Found page.
  // If the fallback was false it would have been taken care as no page which is not prerendered would have been shown and
  // if requested will result in 404 Error
  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// getStaticPaths() returns a list of the dynamic data which is sent over to getStatcProps() function.
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    /** 
    paths: [
      // { params: { pid: 'p1' } },
      // { params: { pid: 'p2' } },

      
      { params: { pid: 'p3' } },
    ],
    */

    // Now we have all the paths now put fallback:true
    paths: pathWithParams,

    // If fallback is false then it will show 404 page for the pages were the path data doesn't match.
    // When fallback is tue then the paths which are mentiomed above will be prerndered while the ones which are not prerendered will be
    // rendered on the fly.
    // fallback: false,
    // fallback: 'blocking',
    fallback: true,
  };
}

export default ProductDetailPage;
