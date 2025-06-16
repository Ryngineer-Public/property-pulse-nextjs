"use client";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
const ShareButtons = ({ property }) => {
  // const shareUrl = window.location.href; // Current page URL
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`; // Example URL for sharing
  const title = "Check out this amazing property!"; // Custom title for sharing
  const description = "Find your dream home with us!"; // Custom description for sharing
  const hashtags = ["realestate", "property", "dreamhome"]; // Custom hashtags for sharing
  return (
    // <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
    //   <FaShare className="mr-2" /> Share Property
    // </button>
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share this Property
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          htmlTitle={title}
          hashtag={`#${hashtags.join(" #")} For Sale`}
        >
          <FacebookIcon
            size={40}
            round={true}
            className="hover:opacity-80 transition-opacity duration-200"
          />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={title}
          hashtags={hashtags}
          className="hover:opacity-80 transition-opacity duration-200"
        >
          <TwitterIcon
            size={40}
            round={true}
            className="hover:opacity-80 transition-opacity duration-200"
          />
        </TwitterShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={title}
          separator=":: "
          className="hover:opacity-80 transition-opacity duration-200"
        >
          <WhatsappIcon
            size={40}
            round={true}
            className="hover:opacity-80 transition-opacity duration-200"
          />
        </WhatsappShareButton>
        <EmailShareButton
          url={shareUrl}
          subject={title}
          body={`Check out this property: ${shareUrl}`}
          className="hover:opacity-80 transition-opacity duration-200"
        >
          <EmailIcon
            size={40}
            round={true}
            className="hover:opacity-80 transition-opacity duration-200"
          />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
