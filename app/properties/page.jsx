import PropertyCard from "@/components/PropertyCard";
import properties from "@/properties.json";
const PropertiesPage = () => {
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
