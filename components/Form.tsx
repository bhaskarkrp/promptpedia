import { FormProps } from "@interfaces/Interface";
import Link from "next/link";
import React from "react";

const Form = ({ type, handleSubmit, post, setPost, submitting }: FormProps) => {
  return (
    <section className="w-full max-w-full flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>

      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world and let your imagination
        run wild with any AI-Powered platfrom.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
            placeholder="Write your AI Prompt here..."
            className="form_textarea"
          />
        </label>

        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags {` `}
            <span className="font-normal">(product,webdevelopemet,idea)</span>
          </span>

          <input
            value={post.tags}
            onChange={(e) =>
              setPost({
                ...post,
                tags: e.target.value?.split(",").map((str) => str.trim()),
              })
            }
            required
            placeholder="write the relevant tags without # and seperate with coma(,)"
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm rounded-full text-white bg-primary-orange"
          >
            {submitting ? `Submitting ${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
