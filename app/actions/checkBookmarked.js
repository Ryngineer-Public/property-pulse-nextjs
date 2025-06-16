"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function checkBookmarked(propertyId) {
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

  // Check if the property is bookmarked
  const isBookmarked = userRecord.favorites.includes(propertyId);

  return {
    isBookmarked,
  };
}

export default checkBookmarked;
