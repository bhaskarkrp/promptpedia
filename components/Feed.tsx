"use client";

import React, { useEffect, useRef, useState } from "react";
import PromptCard from "./PromptCard";
import { PromptDetails } from "@interfaces/Interface";
import Loader from "./Loader";
import { useRouter, useSearchParams } from "next/navigation";

const PromptCardList = ({ data }: { data: PromptDetails[] }) => {
  const router = useRouter();

  const handleClickTag = (tag: string) => {
    router.push(`landing/?tag=${tag}`);
  };

  return (
    <div className="mt-16 prompt_layout">
      {data?.map((prompt: PromptDetails) => (
        <PromptCard
          key={prompt._id}
          promptDetails={prompt}
          handleClickTag={handleClickTag}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const searchParams = useSearchParams();
  const searchTag = searchParams.get("tag");

  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState<PromptDetails[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log({ isLoading });

  const loadedPrompts = useRef<PromptDetails[]>();

  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      loadedPrompts.current = data;
      setPrompts(data);
    };

    fetchPosts();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setSearchText(searchTag?.trim() ?? "");
    searchAll(searchTag?.trim() ?? "");
  }, [searchTag]);

  useEffect(() => {
    const timoutId = setTimeout(() => {
      searchAll(searchText);
    }, 500);

    return () => clearTimeout(timoutId);
  }, [searchText]);

  const searchAll = (input: string) => {
    const filteredPrompt = loadedPrompts?.current?.filter((item) => {
      const searchStrLower = input.toLowerCase();
      return (
        item.prompt.toLowerCase().includes(searchStrLower) ||
        item.creator.email.toLowerCase().includes(searchStrLower) ||
        item.creator.username.toLowerCase().includes(searchStrLower) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchStrLower))
      );
    });

    setPrompts(filteredPrompt);
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchText(e.target?.value);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="feed">
      <form className="relative w-full flex justify-center">
        <input
          type="text"
          placeholder="Search for a tag or prompt..."
          value={searchText}
          onChange={(e) => {
            searchHandler(e);
          }}
          className="search_input peer"
        />
      </form>

      <PromptCardList data={prompts ?? []} />
    </section>
  );
};

export default Feed;
