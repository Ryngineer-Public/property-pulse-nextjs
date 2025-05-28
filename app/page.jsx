import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
import Link from "next/link";

// This is the main page of your application
// It serves as the entry point for your app
// Link is used to create client-side navigation between pages and uses client-side routing
const HomePage = () => {
  // return ( <div className="text-2xl">
  //     <h1 className="text-3xl font-bold underline">
  //         Hello world!
  //     </h1>
  //     <Link href={{
  //         pathname: '/properties',
  //         query: { name: 'test' },
  //     }}>Go to Properties</Link>
  //     <br />
  //     <Link href="/properties/add">Add Property</Link>
  //     <br />
  //     <Link href="/properties/1">Property 1</Link>
  // </div> );
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  );
};

export default HomePage;
