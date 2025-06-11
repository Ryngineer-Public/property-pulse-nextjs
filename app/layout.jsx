import Navbar from "@/components/Navbar";
import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// This layout component is used to wrap the entire application
// It provides a consistent structure and styling across all pages
// metadata is used to define the title and description of the page
// metadata for SEO purposes
export const metadata = {
  title: "Property Pulse",
  description: "Property Website",
  keywords: "property, real estate, buy, sell, rent",
};
// Children is a special prop that allows you to pass data from a parent component to a child component
// In this case, it allows you to pass the content of each page to the layout component
// chikdren here represents the contents of page.jsx ( nex.js will automatically pass the contents of page.jsx to the layout component)
const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
