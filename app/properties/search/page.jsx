"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

// searchParams is a Next.js feature that allows you to access query parameters in the URL
// For example, if the URL is /properties/search?location=NewYork&propertyType=Apartment,
// searchParams will return { location: "NewYork", propertyType: "Apartment" }
// This is a server component
// It is used to render the page on the server side
// This allows for better SEO and performance as the page is rendered on the server and sent to the client
const SearchResultPage = async ({ searchParams }) => {
  const { location, propertyType } = await searchParams;
  await connectDB();
  // Fetch properties based on search parameters
  let query = {};
  if (location) {
    const locationPattern = new RegExp(location, "i"); // Case-insensitive regex
    // Use $regex to perform a case-insensitive search on the location field
    query = {
      $or: [
        { name: locationPattern }, // Match exact location
        { description: locationPattern }, // Match location in description
        { "location.street": locationPattern }, // Match Street in location
        { "location.city": locationPattern }, // Match city in location
        { "location.state": locationPattern }, // Match state in location
        { "location.zipcode": locationPattern }, // Match zip code in location
      ],
    };
  }
  if (propertyType && propertyType !== "All") {
    const propertyTypePattern = new RegExp(propertyType, "i"); // Case-insensitive regex
    query.type = propertyTypePattern; // Match property type
  }
  const properties = await Property.find(query).lean();
  //   if (!properties || properties.length === 0) {
  //     return (
  //       <div className="container m-auto py-10 px-6">No properties found.</div>
  //     );
  //   } else {
  //     return (
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //         {properties.map((property) => (
  //           <PropertyCard key={property._id} property={property} />
  //         ))}
  //       </div>
  //     );
  //   }

  return (
    <>
      <section className="bg-blue-700 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col item-start sm:pv-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-6">Search Results</h1>
          <Link
            href="/properties"
            className="flex item-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to All
            Properties
          </Link>
          {properties.length === 0 ? (
            <p className="text-gray-500">No properties found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultPage;
