import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: [true, "Email already exist!"],
  },
  username: {
    type: String,
    required: [true, "Name is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "UserName invalid, it must contain 8-20 alphanumeric characters and be unique.",
    ],
  },
  image: {
    type: String,
  },
});

const user = models.User || model("User", UserSchema);

export default user;
