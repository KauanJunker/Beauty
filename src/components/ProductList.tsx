import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
  list,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
  list?: boolean;
}) => {
  const wixClient = await wixClientServer();

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams?.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );

  // .find();

  if (searchParams?.sort) {
    console.log("entrou");
    const [sortType, sortBy] = searchParams.sort.split(" ");
    console.log(`Sorting by ${sortBy} in ${sortType} order`);

    if (sortType === "asc") {
      productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  const res = await productQuery.find();

  return (
    <div className="mt-12 flex gap-x-6 gap-y-16 justify-between flex-wrap">
      {res?.items.map((product: products.Product) => (
        <Link
          href={`/${product.slug}`}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              alt=""
              sizes="25vw"
              fill
              className="absolute rounded-md object-cover z-10 hover:opacity-0 
            transition-opacity ease-out duration-500"
            />
            {product.media?.items && (
              <Image
                src={product.media?.items[1]?.image?.url || "/product.png"}
                alt=""
                sizes="25vw"
                fill
                className="absolute rounded-md object-cover"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.price?.price}</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            ></div>
          )}
          <button
            className="w-max rounded-2xl ring-1 ring-lama text-lama py-2 px-4 
        text-xs hover:bg-lama hover:text-white"
          >
            Add to Cart
          </button>
        </Link>
      ))}
      {list && (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      )}
    </div>
  );
};

export default ProductList;
