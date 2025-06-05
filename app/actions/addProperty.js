"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/utils/getSessionUser";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function addProperty(formData) {
  console.log(cloudinary);
  console.log(cloudinary.uploader);
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error("You must be logged in to add a property.");
  }

  const { id: userId } = sessionUser;

  const amentities = formData.getAll("amenities");
  const images = formData.getAll("images").filter((image) => image.name !== "");

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.street"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    amenities: amentities,

    square_feet: formData.get("square_feet"),
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const imageUrls = [];

  // imageFile is a File object representing the image file
  for (const imageFile of images) {
    // Upload each image in cloudinary in base64 format
    const imageBuffer = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const uploadResult = await cloudinary.uploader.upload(
      `data:${imageFile.type};base64,${base64Image}`,
      {
        folder: "propertyPulse",
        resource_type: "image",
      }
    );

    imageUrls.push(uploadResult.secure_url);
  }

  propertyData.images = imageUrls;

  const newProperty = new Property(propertyData);
  await newProperty.save();

  // Revalidates the cache for the root layout to reflect the new property addition
  // This is necessary to ensure that the new property appears in the list of properties
  // and any other components that depend on the root layout.
  // layout is the name of the root layout file in the app directory
  // This will trigger a re-render of the root layout and any components that depend on it.
  revalidatePath("/", "layout");

  // Redirects to the newly created property page
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
