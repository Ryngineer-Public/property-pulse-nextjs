import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

// This file contains the authentication options for NextAuth.js
// It exports the authOptions object which includes the Google provider configuration.
// authorization parameter `prompt: 'consent'` ensures that the user is prompted to grant permissions every time they log in, which is useful for applications that need to refresh access tokens frequently.
// authorization parameter `access_type: 'offline'` is used to request a refresh token, allowing the application to obtain new access tokens without requiring the user to log in again.
// authorization parameter `response_type: 'code'` is used to request an authorization code, which can be exchanged for access and refresh tokens.
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          debug: true, // Enable debug mode for more detailed logs
          scope: "profile email",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      console.log(profile);
      // 1. Connect to DB

      await connectDB();

      const userExists = await User.findOne({ email: profile.email });

      console.log("User exists:", userExists);

      if (!userExists) {
        // If user does not exist, create a new user
        await User.create({
          username: profile.name.slice(0, 20), // Limit username to 20 characters
          email: profile.email,
          image: profile.picture,
        });

        console.log("New user created:", profile.name);
      }
      return true; // Return true to indicate successful sign-in

      // 2. Check if user exists
      // await User.findOne({ email: profile.email })
      //   .then(async (user) => {
      //     // 3. If user exists, return true
      //     if (user) {
      //       return true;
      //     }
      //     // 4. If user does not exist, create a new user and return true
      //     await User.create({
      //       username: profile.name,
      //       email: profile.email,
      //       image: profile.picture,
      //     });
      //     return true;
      //   })
      //   .catch((error) => {
      //     console.error("Error checking or creating user:", error);
      //     return false; // Return false to indicate sign-in failure
      //   });
    },
    // Session callback is used to control what data is returned in the session object
    async session({ session, token }) {
      // 1. Get user from DB using email
      // await User.findOne({ email: session.user.email })
      //   .then((user) => {
      //     // 2. If user exists, add user data to session object
      //     if (user) {
      //       session.user.id = user._id.toString(); // Convert ObjectId to string
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching user:", error);
      //   });
      // // 3. Add user data to session object
      // // 4. Return session object
      // return session;

      const user = await User.findOne({ email: session.user.email });
      if (user) {
        session.user.id = user._id.toString(); // Convert ObjectId to string
      } else {
        console.error("User not found in session callback");
      }
      return session;
    },
  },
};
