"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  {
    id: 1,
    path: "/cr7.jpg",
  },
  {
    id: 2,
    path: "/cristiano.jpg",
  },
  {
    id: 3,
    path: "/cr7.jpg",
  },
  {
    id: 4,
    path: "/cristiano.jpg",
  },
];

const ProductsImages = () => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={images[index].path}
          alt=""
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div>
        {images.map((img, i) => (
          <div
            key={img.id}
            className="w-1/4 h-32 relative gap-4 mt-8"
            onClick={() => setIndex(i)}
          >
            <Image
              src={img.path}
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
