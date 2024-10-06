"use client"

import Link from "next/link";
import React, { useState } from "react";

const Page = () => {

  const [state, setState] = useState(0);
  return (
    <div>
      <p>There are no. of products {state}</p>

      <Link href="/">Home</Link>
      <ul>
        <li><Link href="/product/1" replace>Product 1</Link></li>
        <li><Link href="/product/2">Product 2</Link></li>
        <li><Link href="/product/3">Product 3</Link></li>
      </ul>
    </div>
  );
};

export default Page;
