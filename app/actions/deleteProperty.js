"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/utils/getSessionUser";

const deleteProperty = async (propertyId) => {
  if (!propertyId) {
    throw new Error("Property ID is required to delete a property.");
  }

  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error("You must be logged in to delete a property.");
  }

  const { id: userId } = sessionUser;

  const propertyToDelete = await Property.findOne({
    _id: propertyId,
  });

  if (!propertyToDelete) {
    throw new Error("Property not found.");
  }
  if (propertyToDelete.owner.toString() !== userId) {
    throw new Error("You do not have permission to delete this property.");
  }

  // Delete images from Cloudinary
  for (const image of propertyToDelete.images) {
    console.log("Deleting image:", image);
    if (image.startsWith("http")) {
      // split the url on / , pop - returns the last element, split on . to get the public ID
      // Example: https://res.cloudinary.com/dpztf8mdx/image/upload/v1691234567/property.jpg
      const publicId = image.split("/").pop().split(".")[0]; // Extract public ID from URL
      await cloudinary.uploader.destroy("propertyPulse/" + publicId);
    }
  }
  await propertyToDelete.deleteOne();
  revalidatePath("/", "layout");
};

export default deleteProperty;
