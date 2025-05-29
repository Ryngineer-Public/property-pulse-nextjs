import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
// import properties from "@/properties.json";

// async function as we will be fetching data from the database using mongoose which is an asynchronous operation
const PropertiesPage = async () => {

  // Connect to the database
  await connectDB();
  // Fetch properties from the database and convert them to plain JavaScript objects using .lean().
  // if we use .lean(), it will return plain JavaScript objects instead of Mongoose documents, which is more efficient for read operations.
  // however, we will not be able to use Mongoose methods on the returned objects like save(), update(), etc.
  const properties = await Property.find({}).lean();

  return (
    <section className="px-4 py-6">
      {/* conatiner - centers the content and sets max width for response layouts */}
      {/* mx-auto - sets the left and right margins centering the element horizontally with parent */}
      <div className="container-xl lg:container mx-auto px-4 py-6">
        {properties.length === 0 ? (
          <div>
            <p>No properties found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((property, index) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
