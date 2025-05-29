import properties from "@/properties.json";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";
import connectDB from "@/config/database";
import Property from "@/models/Property";
const HomeProperties = async () => {

  await connectDB();
  // Fetch TOP 3 properties sorted by time from the database and convert them to plain JavaScript objects using .lean().
  const recentProperties = await Property.find({}) 
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .limit(4) // Limit to 4 properties
    .lean(); // Convert to plain JavaScript objects

  // const recentProperties = properties.slice(0, 4); // Get the first 3 properties for the home page
  return (
    <>
      <section className="px-4 py-6">
        {/* conatiner - centers the content and sets max width for response layouts */}
        {/* mx-auto - sets the left and right margins centering the element horizontally with parent */}
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          {recentProperties.length === 0 ? (
            <div>
              <p>No properties found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentProperties.map((property, index) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
      {/* The Tailwind CSS class max-w-lg sets the maximum width of an element to the "large" size, which is 32rem (512px) by default.
This means the element will never be wider than 512px, but can be smaller if the screen or parent container is smaller.
It's commonly used to keep content (like forms or cards) from stretching too wide on large screens, helping maintain a clean, readable layout. */}
      <section className="m-auto max-w-lg px-6 my-6">
        <Link
          href="/properties"
          className="block bg-blue-500 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-600 transition-colors"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
