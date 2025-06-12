"use client";
import { FaBookmark } from "react-icons/fa";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();

  const handleBookmarkClick = async () => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to bookmark properties.");
      return;
    }

    try {
      const res = await bookmarkProperty(property._id);
      toast.success(res.message);
    } catch (error) {
      console.error("Error bookmarking property:", error);
      toast.error("Failed to bookmark property. Please try again.");
    }
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleBookmarkClick}
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
