"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/utils/getSessionUser";
import { redirect } from "next/navigation";

async function editProperty(propertyId, formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error("You must be logged in to edit a property.");
  }

  const { id: userId } = sessionUser;

  const propertyFromDB = await Property.findById(propertyId);
  if (!propertyFromDB) {
    throw new Error("Property not found.");
  }
  if (propertyFromDB.owner.toString() !== userId) {
    throw new Error("You do not have permission to edit this property.");
  }

  const amentities = formData.getAll("amenities");

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

  await Property.findByIdAndUpdate(propertyId, propertyData);
  revalidatePath("/", "layout");
  redirect(`/properties/${propertyId}`);
}

export default editProperty;
