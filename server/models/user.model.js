const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: [true, "This email already exists"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    picture: {
      type: String,
      default: "https://res.cloudinary.com/dstpxts8k/image/upload/v1692256412/user_tchfvb.png",
    },
    status: {
      type: String,
      default: "Hey there, I am using ChatPal",
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Your password must be at least 6 characters long"],
      maxlength: [128, "Your password must be at most 128 characters long"],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

// Hash password before saving to database
userSchema.pre("save", async function (next) {
  try {
    // Only hash the password if it is new
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

module.exports = UserModel;
