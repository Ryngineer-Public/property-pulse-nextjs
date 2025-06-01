"use client";
// This component wraps the application with the NextAuth SessionProvider to manage user sessions.
// SessionProvider is a component from next-auth that provides session management for the application like user authentication and session state.
// Session state is used to determine if a user is logged in or not, and it provides access to user information such as name, email, and profile picture.
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
