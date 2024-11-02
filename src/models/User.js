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
        validator: function(v) {
          return emailValidator.test(v); // Use regex to validate the email format
        },
        message: props => `${props.value} is not a valid email!` // Custom error message
      }
    },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "customer" }, // customer, admin
    createdWithSecretKey: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
