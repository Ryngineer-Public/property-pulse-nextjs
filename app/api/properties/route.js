import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all properties from the database
    const properties = await Property.find({}).lean();

    // Return the properties as JSON
    return new Response(JSON.stringify(properties), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
