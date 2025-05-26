// This is a server component
// params is used to access the dynamic parameters in the URL
// For example, if the URL is /properties/1, params will return { slug: 1 }
// searchParams is used to access the query parameters in the URL
// For example, if the URL is /properties/1?name=test, searchParams will return { name: test }
const ServerPropertyPage = ({ params, searchParams }) => {
    return ( <div>
        <p>Property Page with id : { params.slug }</p>
        <p>Property Page with name : { searchParams.name }</p>
        {/* router.replace is used to navigate to a different page
        // It replaces the current URL with the new URL */}
        {/* <button onClick={ () => router.replace("/")}>Go to Home</button> */}
     </div> );
}

export default ServerPropertyPage;