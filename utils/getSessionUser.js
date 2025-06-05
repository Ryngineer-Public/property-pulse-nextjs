import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export const getSessionUser = async () => {
  //   try {
  // Get the session using the authOptions
  const session = await getServerSession(authOptions);

  // If session exists, return the user object
  if (session && session.user) {
    return { user: session.user, id: session.user.id };
  } else {
    // If no session, return null
    return null;
  }
  //   } catch (error) {
  //     console.error("Error getting session user:", error);
  //     return null; // Return null in case of an error
  //   }
};
