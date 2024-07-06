import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  prompt: {
    type: "string",
    required: [true, "Prompt is required!"],
  },
  tags: {
    type: [{ type: String }],
    required: [true, "Tag is required!"],
  },
  creator: {
    type: Schema.Types.ObjectId,
    red: "User",
  },
});

const prompt = models.Prompt || model("Prompt", PromptSchema);

export default prompt;
