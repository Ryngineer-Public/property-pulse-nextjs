"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
  // Connect to the database
  await connectDB();

  // Get the session user
  const user = await getSessionUser();
  if (!user || !user.id) {
    throw new Error("User not authenticated");
  }

  // Find the user by ID
  const userRecord = await User.findById(user.id);
  if (!userRecord) {
    throw new Error("User not found");
  }
  // Check if the property is already bookmarked
  let isBookmarked = userRecord.favorites.includes(propertyId);

  let message;
  if (isBookmarked) {
    // If already bookmarked, remove it
    userRecord.favorites = userRecord.favorites.filter(
      (id) => id.toString() !== propertyId.toString()
    );
    message = "Property removed from bookmarks.";
    isBookmarked = false;
  } else {
    // If not bookmarked, add it
    userRecord.favorites.push(propertyId);
    message = "Property added to bookmarks.";
    isBookmarked = true;
  }

  await userRecord.save();

  revalidatePath("/properties/saved", "page");

  return {
    isBookmarked,
    message,
  };
}

export default bookmarkProperty;
