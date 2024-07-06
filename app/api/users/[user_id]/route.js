import { connectToDatabase } from "@utils/database";

import User from "@models/user";

const getUserDetails = async (_, { params }) => {
  try {
    await connectToDatabase();

    const { user_id } = params;

    // get user details
    const userDetails = await User.findById(user_id);

    return new Response(JSON.stringify(userDetails), { status: 200 });
  } catch (error) {
    console.log(`Error retrieving user details, error: ${error}`);
    return new Response("Failed to get user deails", { status: 500 });
  }
};

export { getUserDetails as GET };
