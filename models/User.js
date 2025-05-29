import { Schema, model, models } from "mongoose";

// Define the User schema using Mongoose
// The schema defines the structure of the User documents in the MongoDB database
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username must be unique"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  }
);

/*
the part models.User checks if a model named "User" already exists in the Mongoose models cache (models is an object managed by Mongoose that stores all defined models).

If models.User exists, it means the "User" model has already been created (for example, if the code was run before, or during hot-reloading in development).
If it does not exist, model("User", userSchema) creates a new model.
This prevents errors from trying to redefine the same model multiple times, which is a common issue in development environments like Next.js.
*/
const User = models.User || model("User", userSchema);
export default User;
// This code defines a Mongoose schema for a User model
