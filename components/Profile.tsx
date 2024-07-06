import React from "react";
import PromptCard from "./PromptCard";
import { ProfileProps, PromptDetails } from "@interfaces/Interface";

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {!data?.length ? (
        <div className="mt-10 text-left">
          <h3>
            Oh ho, You have not posted anything yet. <br /> <br />
            <span className="text-lg">
              Let's write some thing for modern world to discover, create.
            </span>
          </h3>
        </div>
      ) : (
        <div className="mt-10 prompt_layout">
          {data?.map((prompt: PromptDetails) => (
            <PromptCard
              key={prompt._id}
              promptDetails={prompt}
              handleEditPrompt={() => handleEdit && handleEdit(prompt)}
              handleDeletePrompt={() => handleDelete && handleDelete(prompt)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Profile;
