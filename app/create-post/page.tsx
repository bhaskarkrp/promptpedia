"use client";

import Form from "@components/Form";
import { Prompt } from "@interfaces/Interface";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePost = (): React.ReactNode => {
  const { data: session } = useSession();
  const router = useRouter();
  const [prompt, setPrompt] = useState<Prompt>({
    prompt: "",
    tags: [""],
  });
  const [submitting, setSubmitting] = useState(false);

  const createPrompt = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({ ...prompt, userId: session?.user?.id }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(`Failed to create post, error: ${error}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type={"Create"}
      handleSubmit={createPrompt}
      post={prompt}
      setPost={setPrompt}
      submitting={submitting}
    />
  );
};

export default CreatePost;
