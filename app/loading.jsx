"use client";
import ClipLoader from "react-spinners/ClipLoader";
const LoadingPage = () => {
  {
    /*
The reason for using display: "block" in the override object is to make the spinner behave as a block-level element. This allows the CSS property margin: "100px auto" to horizontally center the spinner within its parent container.

Block elements take up the full width available and respect margin: auto for horizontal centering.
If the spinner were inline or inline-block, margin: auto would not center it horizontally.
So, display: "block" ensures the spinner is centered on the page as intended
*/
  }
  const override = {
    display: "block",
    margin: "100px auto",
    borderColor: "#3b82f6",
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <ClipLoader
        color="#3b82f6"
        size={150}
        aria-label="Loading Spinner"
        cssOverride={override}
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingPage;
