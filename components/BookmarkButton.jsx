"use client";
import { FaBookmark } from "react-icons/fa";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useState, useEffect, use } from "react";
import checkBookmarked from "@/app/actions/checkBookmarked";
import { set } from "mongoose";

const BookmarkButton = ({ property }) => {
  const { data: session, status } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  function checkIfUserLoggedIn() {
    if (!session?.user?.id) {
      setLoading(false);
      return false;
    }
    return true;
  }

  useEffect(() => {
    // if session is not loaded, we should not proceed
    if (status !== "authenticated") {
      console.log("Session not authenticated, skipping bookmark check.");
      setLoading(false);
      return;
    }
    console.log("Fetching bookmark status for property:", property._id);
    async function fetchBookmarkStatus() {
      const res = await checkBookmarked(property._id);
      setIsBookmarked(res.isBookmarked);
      setLoading(false);
    }
    fetchBookmarkStatus();
  }, [property._id, session?.user?.id, isBookmarked]);

  const handleBookmarkClick = async () => {
    if (!checkIfUserLoggedIn()) {
      toast.error("You must be logged in to bookmark properties.");
      return;
    }

    try {
      const res = await bookmarkProperty(property._id);
      toast.success(res.message);
      setIsBookmarked(res.isBookmarked);
    } catch (error) {
      console.error("Error bookmarking property:", error);
      toast.error("Failed to bookmark property. Please try again.");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <button
        className="bg-gray-500 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        disabled
      >
        Loading...
      </button>
    );
  }

  return isBookmarked ? (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleBookmarkClick}
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleBookmarkClick}
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
