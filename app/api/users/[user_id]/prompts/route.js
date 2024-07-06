import { connectToDatabase } from "@utils/database";

import Prompt from "@models/prompt";

const getPrompts = async (_, { params }) => {
  try {
    await connectToDatabase();

    const { user_id } = params;

    // get all prompts
    const prompts = await Prompt.find({
      creator: user_id,
    }).populate({ path: "creator", model: "User" });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(`Error retrieving your personal imaginations, error: ${error}`);
    return new Response("Failed to get your prompts", { status: 500 });
  }
};

export { getPrompts as GET };
