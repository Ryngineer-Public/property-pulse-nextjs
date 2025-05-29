import { Schema, model, models } from "mongoose";

// Define the Property schema using Mongoose
// The schema defines the structure of the Property documents in the MongoDB database
const propertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    location: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
    beds: {
      type: Number,
      required: [true, "Number of beds is required"],
      min: [0, "Number of beds cannot be negative"],
    },
    baths: {
      type: Number,
      required: [true, "Number of baths is required"],
      min: [0, "Number of baths cannot be negative"],
    },
    square_feet: {
      type: Number,
      required: [true, "Square feet is required"],
      min: [0, "Square feet cannot be negative"],
    },
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],
    rates: {
      nightly: Number,
      weekly: Number,
      monthly: Number,
    },
    seller_info: {
      name: {
        type: String,
        required: [true, "Seller name is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Seller email is required"],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, "Seller phone is required"],
        trim: true,
      },
    },
    images: [
      {
        type: String,
      },
    ],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Property = models.Property || model("Property", propertySchema);
export default Property;
// This code defines a Mongoose schema for a Property model
