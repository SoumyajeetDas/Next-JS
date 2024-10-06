"use client";

import IReviewType from "@/types/IReviewType";
import React from "react";

const Page: React.FC<IReviewType> = ({ params }) => {
  const getRandomId = (count: number) => {
    return Math.floor(Math.random() * count);
  };

  const random = getRandomId(2);

  if (random === 1) {
    throw new Error("Error Loading Review");
  }

  return (
    <h1>
      ProductId {params.productId} ReviewId {params.reviewId}
    </h1>
  );
};

export default Page;
