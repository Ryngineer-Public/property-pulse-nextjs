import connectDB from "@/config/database";
import Property from "@/models/Property";
// This is the route handler for fetching a property by ID
export const GET = async (request, { params }) => {
  try {
    // Connect to the database
    await connectDB();

    // Find the property by ID
    const property = await Property.findById(params.id).lean();
    if (!property) {
      return new Response("Property not found", { status: 404 });
    }
    // Return the property as JSON
    return new Response(JSON.stringify(property), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
