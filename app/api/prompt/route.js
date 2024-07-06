import { connectToDatabase } from "@utils/database";

import Prompt from "@models/prompt";

const getPrompts = async () => {
  try {
    await connectToDatabase();

    // get all prompts
    const prompts = await Prompt.find({}).populate({
      path: "creator",
      model: "User",
    });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(`Error retrieving your imaginations, error: ${error}`);
    return new Response("Failed to get your prompt", { status: 500 });
  }
};

export { getPrompts as GET };
