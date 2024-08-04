"use client";

import Image from "next/image";
import { useState } from "react";

// const images = [
//   {
//     id: 1,
//     path: "/cr7.jpg",
//   },
//   {
//     id: 2,
//     path: "/cristiano.jpg",
//   },
//   {
//     id: 3,
//     path: "/cr7.jpg",
//   },
//   {
//     id: 4,
//     path: "/cristiano.jpg",
//   },
// ];

const ProductsImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={items[index].image?.url}
          alt=""
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {items.map((item: any, i: number) => (
          <div
            key={item.id}
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.image?.url || "/cristiano.jpg"}
              alt=""
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsImages;
