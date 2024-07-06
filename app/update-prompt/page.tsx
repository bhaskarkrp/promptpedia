"use client";

import Form from "@components/Form";
import { Prompt } from "@interfaces/Interface";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditPrompt = (): React.ReactNode => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [prompt, setPrompt] = useState<Prompt>({
    prompt: "",
    tags: [""],
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPrompt(data);
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("No prompt id provided.");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({ ...prompt }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(`Failed to create post, error: ${error}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type={"Edit"}
      handleSubmit={updatePrompt}
      post={prompt}
      setPost={setPrompt}
      submitting={submitting}
    />
  );
};

export default EditPrompt;
