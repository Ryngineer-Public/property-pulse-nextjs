# Property pulse nextjs

## This is my first NextJs Project and hence I am including my learning for future references

### Models

In Next.js, models are typically used to define the structure of data that your application will work with. They can represent entities such as users, properties, or any other domain-specific objects. Models help in organizing and validating data, especially when interacting with databases or APIs.

MongoDB Models:
In the context of a Next.js application using MongoDB, models are often defined using Mongoose, an ODM (Object Data Modeling) library for MongoDB and Node.js. Mongoose allows you to define schemas for your data, which can include fields, types, validation rules, and methods.

mongoose.models is Mongoose model cache. It stores all the models that have been defined in your application. When you define a model using mongoose.model('ModelName', schema), it gets added to this cache.
This allows you to reuse the same model without redefining it, which is particularly useful in serverless environments like Next.js where the same code may run multiple times.

### Layout.jsx

In a Next.js application, the layout.jsx file is significant because it defines a shared layout for your application. It is part of the App Router introduced in Next.js 13, which uses the app directory for routing and layouts.

Significance of layout.jsx
S
hared Layout:

The layout.jsx **file wraps all pages and components within a specific route segment**. It allows you to define a consistent structure (e.g., headers, footers, sidebars) across multiple pages.
Automatic Usage:

Next.js automatically applies the layout defined in layout.jsx to all child routes within the same directory.
Server Components:

Layouts in the app directory are React Server Components by default, which improves performance by rendering on the server.
Global Styles:

You typically import global styles (like globals.css) in the layout.jsx file to ensure they are applied across the entire application.
Can It Be Named Anything Else?
No, the file must be named layout.jsx (or layout.tsx for TypeScript) for Next.js to recognize it as a layout file. This is a convention enforced by the framework when using the app directory.

If you rename it to something else, Next.js will not treat it as a layout, and it will not work as expected. If you need multiple layouts, you can create additional layout.jsx files in different route segments within the app directory.

## what is tailwind

Tailwind CSS is a utility-first CSS framework that provides a set of pre-defined classes to build custom designs directly in your HTML or JSX. Instead of writing custom CSS, you use utility classes like text-center, bg-blue-500, or p-4 to style elements. It is highly customizable through a configuration file (tailwind.config.js) and promotes rapid development with consistent, reusable styles.

## Files in Tailwind

### tailwind.config.js - Deprecated as of Tailwind CSS v4 ( all of the configurations are now in globals.css under @theme)

This file, tailwind.config.js, is the configuration file for Tailwind CSS in your project. Here's a breakdown of its contents:

content:

    This specifies the paths to all files in your project where Tailwind CSS classes might be used.
    It includes files in the pages and components directories with extensions .js, .ts, .jsx, and .tsx.

theme:

    This section allows you to customize the default Tailwind CSS theme.

    The extend property is used to add or override specific theme values without completely replacing the default theme.

fontfamily:

    Adds a custom font family named sans with "Poppins" as the primary font and "sans-serif" as the fallback.

gridTemplateColumns:

    Adds a custom grid column configuration named 70/30 with column widths of 70% and 28%.

plugins:

    This is an array where you can add Tailwind CSS plugins to extend its functionality. Currently, it is empty.

### globals.css

The globals.css file you provided is a global stylesheet for your Next.js application. It uses Tailwind CSS, a utility-first CSS framework, to style your application. Here's what each line does:

Purpose in the Project

    This file ensures that Tailwind CSS is globally applied to your application.
    It is typically imported in the \_app.js or layout.jsx file to apply these styles across all pages.

### postcss.config.mjs

The postcss.config.mjs file is used to configure PostCSS, a tool for transforming CSS with JavaScript plugins. In your project, it is specifically configured to work with Tailwind CSS.

Use in Your Project:
Tailwind CSS Integration:

    The file specifies the plugins that PostCSS should use. In your case, it includes @tailwindcss/postcss, which processes Tailwind's directives (@tailwind base;, @tailwind components;, @tailwind utilities;) in your CSS files.

CSS Transformation:

    PostCSS processes your CSS files and applies transformations like adding vendor prefixes (via autoprefixer) or optimizing the CSS for production.

Build Process:

    When you run your development or build scripts (e.g., npm run dev or npm run build), PostCSS uses this configuration to process your CSS files.

Current Configuration:

    This configuration tells PostCSS to use the @tailwindcss/postcss plugin to transform your css file.

### What is the use of "export default"

    In JavaScript, export default is used to export a single value, function, or class from a module so it can be imported elsewhere in your application. It allows you to define a default export for the module, which can be imported without using curly braces.

    In the Context of layout.jsx:
        In your layout.jsx file, the export default MainLayout; statement exports the MainLayout component as the default export of the file. This means that when another file imports from layout.jsx, it will receive the MainLayout component by default.

        If you want to use the MainLayout component in another file, you can import it like this:

        ```text import MainLayout from './layout' ```

### Favicon

Adding an image with the name favicon.ico within app folder creates a favicon for the site.

### Metadata from layout file and how does Net.js use it

How Next.js Uses Metadata:
Automatic Integration:

When you export a metadata object from a layout.jsx file, Next.js automatically applies it to the <head> section of the HTML for all pages that use that layout.
Dynamic Metadata:

You can define metadata dynamically for specific layouts or pages. For example, you can set a unique title or description for different sections of your app.
SEO and Social Sharing:

Metadata like title, description, and keywords are used by search engines and social media platforms to display information about your site.
Hierarchical Application:

Metadata defined in a layout.jsx file applies to all child routes within that layout. If a child route defines its own metadata, it will override or extend the parent layout's metadata.

### File Based Routing in Next.js

Next.js file-based routing is a system where the structure of the pages or app directory defines the routes of your application. Here's a summary:

File-to-Route Mapping:

    Each file in the pages or app directory corresponds to a route.
    For example, page.jsx maps to /, and page.jsx maps to /properties.

Dynamic Routes:

    Files or folders with square brackets ([id]) define dynamic routes.
    For example, page.jsx maps to /properties/:id, where :id is a dynamic segment.

Nested Routes:

    Subfolders create nested routes.
    For example, page.jsx maps to /properties/add.

Layouts:

    The layout.jsx file in a folder defines a shared layout for all routes within that folder.

Special Files:

    page.jsx: Defines the main content for a route.
    layout.jsx: Defines a shared layout for nested routes.
    error.jsx: Handles errors for a route.

This system simplifies routing by using the file structure to define routes automatically, without needing a separate configuration.

### Client Vs Server Component

Client components are rendered on the browser and Server components on the server. Refer to ClientVsServer.jpg in the assests folder.

A Component is converted to a client component by using 'use client' at the top of the component.

/app/properties/[slug]/page.jsx - shows server component that retrieves pathparam and searchParam (query param)

/app/properties/clientRendered/[id]/page.jsx - shows a class that is rendered on the client and how to extract path param / path name etc - uses hooks.

### usePathname

The usePathname hook from next/navigation in Next.js is used to retrieve the current URL path of the application. It is particularly useful in client-side components for tasks like:

Active Link Highlighting:

You can use usePathname to determine the current route and apply styles or classes to indicate the active page in a navigation menu.
Conditional Rendering:

Based on the current path, you can conditionally render components or content.
Dynamic Behavior:

It helps in implementing dynamic behaviors that depend on the current route, such as showing or hiding elements.

```javascript
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a href="/" className={pathname === "/" ? "active" : ""}>
        Home
      </a>
      <a href="/about" className={pathname === "/about" ? "active" : ""}>
        About
      </a>
    </nav>
  );
};
```

### Next JS Image Tag - sizes property

“which image size the browser downloads” in the context of the Next.js <Image /> component:

#### How Next.js <Image /> Works

When you use the <Image /> component, Next.js can automatically generate and serve multiple versions (different sizes) of your image.
The browser then chooses the most appropriate image size to download based on the device’s screen size and the sizes prop you provide.

#### Why Does This Matter?

Performance: Smaller devices (like phones) don’t need huge images, so the browser can download a smaller, faster-loading version.
Quality: Larger screens (like desktops) can get a higher-resolution image for better quality.

#### Example

Suppose you have a single image file (e.g., a1.jpg). Next.js, behind the scenes, can create several versions of this image at different widths (e.g., 400px, 800px, 1200px wide).

If a user visits your site on a phone, the browser will download the 400px version.
If a user visits on a large desktop, the browser might download the 1200px version.
This is controlled by the sizes prop and the browser’s logic.

In Your Code
You have:

> sizes="100vw" tells the browser: “This image will always be as wide as the viewport.”
> Next.js provides the browser with a list of available image widths.
> The browser picks the best one for the current device and screen size.
> You only need to provide one image file. Next.js handles the rest!

Summary:
You provide one image, but Next.js and the browser work together to serve the best-sized version for each user, improving speed and quality automatically. You don’t have to manually create or manage multiple image files.

## Routes / exposing apis in Next.js

Exposing APIs in Next.js is done through the API routes feature. API routes allow you to create serverless functions that can handle HTTP requests and responses, making it easy to build backend functionality within your Next.js application.

### How to Create API Routes

1. **Create an API Directory**: Inside the `app` directory, create a folder named `api`. This is where all your API routes will reside.
2. **Define API Routes**: Inside the `api` folder, create files that represent your API endpoints. Each file corresponds to a route. For example:

   - `app/api/users/route.js` for `/api/users`
   - `app/api/products/route.js` for `/api/products`

3. **Export a Function**: In each route file, export a function that handles the request and response. This function can handle different HTTP methods like GET, POST, PUT, DELETE, etc.

Reference the `app/api/properties/route.js` file in the project for an example of how to define an API route.
