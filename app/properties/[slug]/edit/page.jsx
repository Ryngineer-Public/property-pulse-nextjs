import PropertyEditForm from "@/components/PropertyEditForm";
import Property from "@/models/Property";
import connectDB from "@/config/database";
import { convertToSerializableObjects } from "@/utils/convertToSerializableObjects";
const PropertyEditPage = async ({ params }) => {
  const { slug } = await params;
  await connectDB();

  const propertyFromDB = await Property.findById(slug).lean();
  const property = convertToSerializableObjects(propertyFromDB);
  if (!property) {
    return (
      <div className="container m-auto py-10 px-6">
        <h1 className="text-center text-2xl font-bold text-red-500">
          Property not found
        </h1>
      </div>
    );
  }

  return (
    <section className="bg-blue-50">
      <div className="container mx-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
