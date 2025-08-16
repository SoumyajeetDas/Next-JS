import React, { Suspense } from 'react';
import fetchData from './api/fetchdata';
import Card from './component/Card';

export default function Home() {
  // const [data, setData] = useState<ApiResponse | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     setLoading(true);
  //     const response = await fetch(
  //       'https://jsonplaceholder.typicode.com/todos/1',
  //     );
  //     const json = await response.json();
  //     setData(json);
  //     setLoading(false);
  //   })();
  // }, []);

  const data = fetchData();

  return (
    <div className="flex flex-row justify-center items-center h-screen gap-10">
      <Suspense fallback={<div>Loading...</div>}>
        <Card data={data} />
      </Suspense>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Welcome to Next.js 15</h1>
        <p className="mt-4 text-lg">
          This is a simple example of using Next.js 15 with Tailwind CSS.
        </p>
      </div>
    </div>
  );
}
