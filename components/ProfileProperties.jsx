"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import deleteProperty from "@/app/actions/deleteProperty";
import { toast } from "react-toastify";

const ProfileProperties = ({ properties: initialProperites }) => {
  const [properties, setProperties] = useState(initialProperites);
  //   console.log("ProfileProperties:", properties);

  const handleDelete = async (propertyId) => {
    // confirm the deletion
    if (
      !propertyId ||
      !confirm("Are you sure you want to delete this property?")
    ) {
      return;
    }

    try {
      await deleteProperty(propertyId);
      // update the state to remove the property from the UI
      // prev is the previous state of properties that is passed by react when setProperties is called
      setProperties((prev) =>
        prev.filter((property) => property._id !== propertyId)
      );
      toast.success("Property deleted successfully!");
    } catch (error) {
      console.error("Error deleting property:", error);
      // Handle error (e.g., show a notification)
      toast.error("Failed to delete property. Please try again later.");
    }
  };

  return properties.map((property) => (
    <div key={property._id} className="mb-10">
      <Link href={`/properties/${property._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={
            property.images && property.images[0]
              ? property.images[0].startsWith("https")
                ? property.images[0]
                : `/images/properties/${property.images[0]}`
              : "/images/properties/default.jpg"
          }
          alt="Property 1"
          width={1000}
          height={600}
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          Address: {property.location.street} {property.location.city}{" "}
          {property.location.state}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={`/properties/${property._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => handleDelete(property._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
