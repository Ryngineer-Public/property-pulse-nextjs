import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth/next";

// NextAuth function is a middleware that handles authentication requests.
// It uses the authOptions object to configure the authentication providers and callbacks.
// when a user attempts to sign in, next-auth will use the Google provider configuration defined in authOptions to authenticate the user.
const handler = NextAuth(authOptions);

// Whenever a request is made to the /api/auth/[...nextauth] endpoint, this handler will be invoked.
export { handler as GET, handler as POST };
