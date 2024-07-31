import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductsImages from "@/components/ProductImages";

const SinglePage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* IMG  */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductsImages />
      </div>
      {/* TEXT  */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">Product Name</h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat,
          perferendis expedita nobis quibusdam distinctio beatae fugiat officia
          asperiores hic nihil neque porro perspiciatis reprehenderit deserunt
          assumenda non odio dignissimos. Commodi.
        </p>
        <div className="h-[2px] bg-gray-100" />
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">$59</h3>
          <h3 className="font-medium text-2xl">$49</h3>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <CustomizeProducts />
        <Add />
        <div className="h-[2px] bg-gray-100" />
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum,
            voluptatem numquam! Commodi, eaque facere, accusantium cum vero,
            pariatur cupiditate ipsum esse reprehenderit distinctio consequatur?
            Nam beatae reprehenderit praesentium necessitatibus officia!
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum,
            voluptatem numquam! Commodi, eaque facere, accusantium cum vero,
            pariatur cupiditate ipsum esse reprehenderit distinctio consequatur?
            Nam beatae reprehenderit praesentium necessitatibus officia!
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum,
            voluptatem numquam! Commodi, eaque facere, accusantium cum vero,
            pariatur cupiditate ipsum esse reprehenderit distinctio consequatur?
            Nam beatae reprehenderit praesentium necessitatibus officia!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
