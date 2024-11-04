import mongoose from "mongoose";

// Regular expression for validating email
const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          // Use regex to validate the email format
          return emailValidator.test(v); 
        },
        // Custom error message
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: { type: String, required: true },
    // customer, admin
    role: { type: String, required: true, default: "customer" }, 
    createdWithSecretKey: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
