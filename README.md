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

## Authentication in Next.js

We use Next Auth for authentication in Next.js applications. Next Auth is a flexible and easy-to-use authentication solution that integrates seamlessly with Next.js.

### What is Next Auth?

Next Auth is a library for Next.js that provides authentication and authorization features. It supports various authentication providers (like Google, Facebook, GitHub, etc.) and allows you to manage user sessions easily.
It uses Serverless functions to handle authentication requests, making it suitable for serverless environments like Vercel.

### HOw does Next Auth use Serverless Functions?

Next Auth uses serverless functions to handle authentication requests, such as signing in, signing out, and managing user sessions. When a user interacts with the authentication flow (e.g., clicking "Sign in with Google"), Next Auth triggers a serverless function that processes the request.
This function can handle tasks like redirecting the user to the authentication provider, verifying credentials, and managing user sessions.

#### But Why Serverless Functions?

Serverless functions are ideal for authentication because they can scale automatically, handle requests quickly, and reduce server management overhead. They allow you to focus on building your application without worrying about server infrastructure.

### Does Next Auth create serverless functions?

Yes, Next Auth creates serverless functions for handling authentication requests. When you set up Next Auth in your Next.js application, it automatically generates API routes that act as serverless functions to manage the authentication flow.

### An highlevel ovrview / flow of how Next Auth works with sessions

1. **User Initiates Authentication**: The user clicks a "Sign in" button, which triggers a request to the Next Auth API route (e.g., `/api/auth/signin`).
2. **Redirect to Provider**: Next Auth redirects the user to the chosen authentication provider (e.g., Google, GitHub) for login.
3. **User Authenticates**: The user logs in on the provider's site and grants permission to your application.
4. **Callback to Next Auth**: After successful authentication, the provider redirects the user back to a callback URL defined in your Next Auth configuration (e.g., `/api/auth/callback/google`).
5. **Session Creation**: Next Auth processes the callback, verifies the user's credentials, and creates a session for the user.
6. **Session Storage**: The session information is stored in a secure cookie or database, depending on your Next Auth configuration.
7. **User Accesses Protected Routes**: When the user accesses protected routes in your application, Next Auth checks the session to determine if the user is authenticated.
8. **Session Management**: Next Auth provides methods to manage the session, such as checking if a user is authenticated, signing out, or refreshing the session.

### SignIn and SignOut process within the application.

1. app/api/auth/[...nextauth]]/route.js: This route handles the authentication logic for Next Auth.
2. utils/authOptions.js: This file contains the configuration options for Next Auth, including providers, callbacks, and session management. In our case, it uses Google as the authentication provider.
3. components/AuthProvider.jsx: This component wraps the application with the Next Auth session provider, allowing access to authentication state throughout the app.
4. layout.jsx: This file includes the AuthProvider component to ensure that authentication state is available in all pages.
5. components/Navbar.jsx: This component displays the navigation bar, including the sign-in and sign-out buttons. It uses the useSession hook from Next Auth to check the authentication state and render appropriate buttons. it includes a useEffect hook to get the authentication provider and set the provider state which is used during signin process.

## next.config.mjs

The next.config.mjs file is a configuration file for Next.js applications. It allows you to customize various aspects of your Next.js project, such as enabling experimental features, configuring image optimization, and setting up environment variables.

### Purpose in the Project

Next.js requires you to specify allowed hostnames for remote images (like in your images.remotePatterns config) for security and performance reasons:

Security:
Allowing only specific hostnames prevents malicious sites from serving harmful or unexpected images through your app. This helps protect users from attacks like phishing or cross-site scripting (XSS) via image URLs.

Performance:
Next.js optimizes images (resizing, caching, etc.) at build or runtime. By restricting hostnames, it avoids unnecessary processing of images from unknown or unreliable sources, which could slow down your app or increase server costs.

Control:
You maintain control over which external sources your app trusts for images, reducing the risk of broken images or unexpected content changes.

Gotcha:
If you forget to add a hostname, images from that source won’t load, and you’ll see an error in the browser console.

Example:
Your config allows images only from lh3.googleusercontent.com over HTTPS. Any other remote image source will be blocked by Next.js.

## middleware.js

The middleware.js file in a Next.js application is used to define custom middleware functions that can run before requests are processed by the application. Middleware allows you to perform actions like authentication, logging, or modifying requests and responses.

### Purpose in the Project

In our project middleware.js is used to determine if a user is authenticated before allowing access to certain routes. It checks the session and redirects unauthenticated users to the sign-in page.
paths defined in the matcher property specify which routes the middleware should apply to. In this case, it applies to all routes except for the sign-in page and the API routes.

### How It Works

1. **Session Check**: The middleware checks if a user session exists using the getServerSession function from Next Auth.
2. **Redirection**: If the session does not exist, it redirects the user to the sign-in page (e.g., /signin).
3. **Allowed Paths**: The middleware allows access to certain paths (like /signin and /api/auth) without authentication, so users can sign in or access public APIs.

## Next JS Action

In Next.js, actions are used to handle form submissions and other server-side logic. They allow you to define functions that can be called from the client side to perform operations like creating, updating, or deleting data.

### Purpose in the Project

In our project, actions are used to handle form submissions for creating and updating properties. They allow us to perform server-side operations like saving data to the database without needing to write separate API routes.

### How It Works

1. **Define Action Functions**: In the properties folder, we define action functions (e.g., addProperty) that handle the logic for creating or updating properties.
   you can retrieve form data using formData.get('fieldName') to access specific fields from the submitted form.
2. **Use Action in Form**: In the form component, we use the action function to handle the form submission. When the form is submitted, it calls the action function with the form data.
3. **Server-Side Execution**: The action function runs on the server, allowing us to access server-side resources like the database or session information.

## Utilities

### utils/getSessionUser.js

The getSessionUser function is a utility function that retrieves the currently authenticated user from the session in a Next.js application using Next Auth. It is typically used to access user information in server-side components or API routes.

## Constructs

### revalidatePath function used in addProperty.js

The revalidatePath function in Next.js is used to trigger a revalidation of a specific path, allowing you to refresh the data for that path without needing to reload the entire page. This is particularly useful in scenarios where you want to update the content of a page after performing an action, such as creating or updating data.

### Purpose in the Project

In our project, revalidatePath is used after creating or updating a property to ensure that the page displaying the list of properties is refreshed with the latest data. This allows users to see the changes immediately without having to manually refresh the page.

### How It Works

1. **Import the Function**: Import revalidatePath from next/cache in the file where you want to use it.

```javascript
import { revalidatePath } from "next/cache";
```

2. **Call the Function**: After performing an action (like creating or updating a property), call revalidatePath with the path you want to refresh. For example:

```javascript
revalidatePath('/',"layout');
```

The above code will trigger a revalidation of the root path (/) and the layout, ensuring that any data fetched for that path is updated.
layout argument is passed to ensure that the layout is also revalidated, which is important if the layout contains navigation or other components that depend on the latest data.

## Why 'use client' within error.jsx and not in notFound.jsx

In Next.js (especially with the App Router), the "use client" directive at the top of a file tells Next.js to treat that component as a client component—meaning it will be rendered on the client side, not the server.

### Why "use client" for error.jsx?

    Error boundaries in Next.js (using error.jsx) often need to handle client-side errors, such as those thrown during rendering or in event handlers.
    If you want to use React hooks (like useEffect, useState) or interact with the browser (e.g., showing a toast, logging to a client-side service), you must mark the component as a client component.
    Some error UI (like using react-icons or other client-only libraries) may require client-side rendering.

### Why not for not-found.jsx?

    The not-found.jsx file is used for handling 404 pages. It's typically rendered only on the server when a route doesn't exist.
    It usually just displays a static message, so it doesn't need client-side interactivity or hooks.
    By default, Next.js treats not-found.jsx as a server component, which is more efficient for static content.

### Client vs. Server Components

Server Components and Client Components are two types of React components in Next.js (especially with the App Router):

Server Components
Default in Next.js app directory.
Rendered on the server (Node.js), not in the browser.
Can access server-side resources directly (like databases, file system, environment variables).
Cannot use React hooks that require the browser (like useState, useEffect).
Do not increase client-side JavaScript bundle size.
Syntax: No special directive needed.

Client Components
Rendered on the client (browser).
Can use browser-only APIs and React hooks (useState, useEffect, etc.).
Needed for interactivity (forms, modals, event handlers).
Must include "use client" at the top of the file.
Increase client-side JavaScript bundle size.

### Why use a client component?

#### Interactivity:

Client components allow you to use React hooks like useState, useEffect, and useContext to manage local state, handle user events, and perform side effects in the browser.

#### Browser APIs:

You can access browser-specific features (like window, document, localStorage, geolocation, etc.) that are not available on the server.

#### Dynamic UI:

Components that need to update in response to user actions (forms, modals, dropdowns, tabs, etc.) must be client components.

#### Third-party libraries:

Many UI libraries (like Material UI, React Bootstrap, or charting libraries) require client-side rendering and hooks.

## Setting up MongoDB Locally

To set up MongoDB locally for your Next.js project, you can use Docker to run a MongoDB container. This allows you to easily manage your database without needing to install MongoDB directly on your machine.

### Server Functions

A Server Function is a function that executes on the server. In Next.js these functions can be invoked from client components.. When the framework builds your application, it passes a reference of the server function to the client component. When the client conmponent calls the server function, it sends a http request to the server by serializing the request params and if the server function returns data that is also serialized.

Eg : Server actions within PropertyEditForm.jsx. The action function invokes a server function that is marked as a server function.

### Download Mongo Image

To run MongoDB locally, you can use Docker to pull the official MongoDB image. Open your terminal and run the following command:

```bash
docker pull mongo
```

### Run MongoDB Container

Once the image is downloaded, you can run a MongoDB container with the following command:

Navigate to `cd C:\PersonalSpace\Projects\NextJs\mongo-store` or your desired directory where you want to store MongoDB data.

```bash


docker run -d --name my-mongo -p 27017:27017 -v ./mongo-data:/data/db -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=adminpassword mongo
```

This command does the following:

- `-d`: Runs the container in detached mode (in the background).
- `--name my-mongo`: Names the container "my-mongo".
- `-p 27017:27017`: Maps port 27017 on your host to port 27017 in the container (the default MongoDB port).
- `-v ./mongo-data:/data/db`: Mounts a volume to persist MongoDB data on your host machine (you can change the path as needed).
- `-e MONGO_INITDB_ROOT_USERNAME=admin`: Sets the root username for MongoDB.
- `-e MONGO_INITDB_ROOT_PASSWORD=adminpassword`: Sets the root password for MongoDB.

### Connect to MongoDB using MongoDB Compass

1. Open MongoDB Compass.
2. In the "New Connection" dialog, enter the following connection string:

```mongodb://admin:adminpassword@localhost:27017/mydatabase?authSource=admin

```

3. Click "Connect" to establish a connection to your local MongoDB instance.

4. Create a new database named `propertypulse` by clicking on "Create Database" and entering the name.
5. Create a collection named `properties` within the `propertypulse` database.

### Create a User for the collection

1. Run the following command in the MongoDB shell to create a user for your collection:

```bash
use propertypulse
db.createUser({
  user: "appuser",
  pwd: "apppassword",
  roles: [{ role: "readWrite", db: "propertypulse" }]
})
```

### Notification using Toastify

Toastify is a lightweight JavaScript library for creating toast notifications in web applications. It provides a simple way to display messages to users, such as success, error, or informational notifications.

### How to Use Toastify in Your Next.js Project

1. **Install Toastify**: First, you need to install the Toastify library in your Next.js project. You can do this using npm or yarn:

```bash
npm install react-toastify
```

2. **Import Toastify**: In the component where you want to use notifications, import the necessary components from Toastify

Refer Layout.jsx for an example of how to import Toastify and its CSS styles. 3. **Initialize Toastify**: In your component, you can use the `toast` function to create notifications. For example, you can show a success message after a successful form submission or an error message if something goes wrong.

```javascript
import { toast } from "react-toastify";
const handleSubmit = async (data) => {
  try {
    // Perform your form submission logic here
    await submitForm(data);
    toast.success("Property added successfully!");
  } catch (error) {
    toast.error("Failed to add property. Please try again.");
  }
};
```
