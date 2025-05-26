// use client used to indicate that this component should be rendered on the client side
// This is important for components that rely on client-side features like routing
// and state management
'use client'
// useRouter and useParams are hooks provided by Next.js for client-side routing
// useRouter is used to programmatically navigate between pages
// useParams is used to access the dynamic parameters in the URL
// For example, if the URL is /properties/1, useParams will return { id: 1 }
// useParams is used to access the dynamic parameters in the URL
import { useRouter, useParams, useSearchParams, usePathname } from "next/navigation";

const ClientRenderedPropertyPage = () => {
    const router = useRouter();
    const params = useParams();
    // useSearchParams is used to access the query parameters in the UR
    const searchParams = useSearchParams();
    // usePathname is used to access the current pathname
    // For example, if the URL is /properties/1, usePathname will return /properties/1
    const pathname = usePathname();

    return ( <div>
        <p>Property Page with id : { params.id }</p>
        <p>Property Page with name : { searchParams.get("name") }</p>
        <p>Property Page with pathname : { pathname }</p>
        {/* // router.replace is used to navigate to a different page */}
        {/* // It replaces the current URL with the new URL */}
        <button onClick={ () => router.replace("/")}>Go to Home</button>
     </div> );
}
 
export default PropertyPage;