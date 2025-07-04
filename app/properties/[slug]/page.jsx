// This is a server component
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImage from "@/components/PropertyImage";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/PropertyDetails";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

// params is used to access the dynamic parameters in the URL
// For example, if the URL is /properties/1, params will return { slug: 1 }
// searchParams is used to access the query parameters in the URL
// For example, if the URL is /properties/1?name=test, searchParams will return { name: test }
const ServerPropertyPage = async (props) => {
  const { params, searchParams } = await props;

  await connectDB();

  const { slug } = await params;

  const property = await Property.findById(slug).lean();

  if (!property) {
    return (
      <div className="container m-auto py-10 px-6">
        <h1 className="text-center text-2xl font-bold text-red-500">
          Property not found
        </h1>
        <Link href="/properties" className="text-blue-500 hover:text-blue-600">
          <FaArrowLeft className="mr-2" />
          Back to Properties
        </Link>
      </div>
    );
  }

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
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImage images={property.images} />
    </>
  );
};

export default ServerPropertyPage;
