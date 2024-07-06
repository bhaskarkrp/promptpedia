import { connectToDatabase } from "@utils/database";

import Prompt from "@models/prompt";

//GET
const getPrompt = async (_, { params }) => {
  try {
    await connectToDatabase();
    const { prompt_id } = params;

    // get all prompts
    const prompt = await Prompt.findById(prompt_id).populate({
      path: "creator",
      model: "User",
    });

    if (!prompt) return new Response("Prompt not found!", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(`Error retrieving your imagination, error: ${error}`);
    return new Response("Failed to get your prompt", { status: 500 });
  }
};

// PATCH
const updatePrompt = async (request, { params }) => {
  try {
    await connectToDatabase();
    const { prompt_id } = params;
    const { prompt, tags } = await request.json();

    // get all prompts
    const existingPrompt = await Prompt.findById(prompt_id).populate({
      path: "creator",
      model: "User",
    });

    if (!prompt) return new Response("Prompt not found!", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tags = tags;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log(`Error updating your imagination, error: ${error}`);
    return new Response("Failed to update your prompt", { status: 500 });
  }
};

// DELETE
const deletePrompt = async (_, { params }) => {
  try {
    await connectToDatabase();
    const { prompt_id } = params;

    // get all prompts
    await Prompt.findByIdAndDelete(prompt_id);

    return new Response("Prompt deleted successfully!", { status: 200 });
  } catch (error) {
    console.log(`Error deleting your imagination, error: ${error}`);
    return new Response("Failed to delete your prompt", { status: 500 });
  }
};

export { getPrompt as GET, updatePrompt as PATCH, deletePrompt as DELETE };
