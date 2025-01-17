import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RefreshTokenModel =
  mongoose.models.refreshTokens ||
  mongoose.model("refreshTokens", RefreshTokenSchema);
