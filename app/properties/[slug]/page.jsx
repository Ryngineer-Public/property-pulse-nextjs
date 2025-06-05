// This is a server component
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImage from "@/components/PropertyImage";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/PropertyDetails";

// params is used to access the dynamic parameters in the URL
// For example, if the URL is /properties/1, params will return { slug: 1 }
// searchParams is used to access the query parameters in the URL
// For example, if the URL is /properties/1?name=test, searchParams will return { name: test }
const ServerPropertyPage = async (props) => {
  const { params, searchParams } = await props;

  await connectDB();

  const property = await Property.findById(params.slug).lean();

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
      <PropertyImage images={property.images} />
    </>
  );
};

export default ServerPropertyPage;
