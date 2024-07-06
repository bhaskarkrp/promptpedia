"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Profile from "@components/Profile";
import { PromptDetails } from "@interfaces/Interface";
import Loader from "@components/Loader";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [myPrompts, setMyPrompts] = useState<PromptDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPrompts = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/users/${session?.user?.id}/prompts`);
      const data = await response.json();

      setMyPrompts(data);
      setIsLoading(false);
    };

    if (session?.user?.id) fetchPrompts();
  }, [session?.user?.id]);

  const handleEdit = (prompt: PromptDetails) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt: PromptDetails) => {
    const hasConfirmed = confirm(
      `Are you sure you want to delete this prompt?`
    );

    if (hasConfirmed) {
      const response = await fetch(`/api/prompt/${prompt._id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        const filteredPrompt = myPrompts?.filter((p) => p._id !== prompt._id);
        setMyPrompts(filteredPrompt);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalised profile page."
      data={myPrompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
