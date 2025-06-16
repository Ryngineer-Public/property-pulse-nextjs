import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";

import connectDB from "@/config/database";
import PropertyCard from "@/components/PropertyCard";

const SavedPropertyPage = async () => {
  await connectDB();
  const { id } = await getSessionUser();
  if (!id) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">
          You must be logged in to view saved properties.
        </h1>
      </div>
    );
  }
  // populate is like fetch in hibernate, it fetches the related data
  const { favorites: bookmarks } = await User.findById(id).populate(
    "favorites"
  );
  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p className="text-gray-500">You have no saved properties.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertyPage;
