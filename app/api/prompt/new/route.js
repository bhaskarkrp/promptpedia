import { connectToDatabase } from "@utils/database";

import Prompt from "@models/prompt";

export const POST = async (req, res, next) => {
  const { userId, prompt, tags } = await req.json();

  try {
    await connectToDatabase();

    // create a new prompt
    const newPrompt = new Prompt({ creator: userId, prompt, tags });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(`Error saving your imagination, error: ${error}`);
    return new Response("Failed to save your prompt", { status: 500 });
  }
};
