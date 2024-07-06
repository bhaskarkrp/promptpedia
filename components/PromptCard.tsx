"use client";

import { PromptCardProps } from "@interfaces/Interface";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const PromptCard = ({
  promptDetails,
  handleClickTag,
  handleEditPrompt,
  handleDeletePrompt,
}: PromptCardProps) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(promptDetails.prompt);
    navigator.clipboard.writeText(promptDetails.prompt);

    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={() => {
            promptDetails?.creator?._id === session?.user?.id
              ? router.push("/profile")
              : router.push(`/profile/${promptDetails?.creator?._id}`);
          }}
        >
          <Image
            src={promptDetails?.creator?.image}
            alt="creator profile"
            className="rounded-full object-contain"
            height={40}
            width={40}
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {promptDetails?.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {promptDetails?.creator?.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === promptDetails.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy-tick image"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {promptDetails.prompt}
      </p>

      <div className="flex justify-start gap-2 flex-wrap">
        {promptDetails?.tags?.length
          ? promptDetails.tags?.map((t) => (
              <p
                key={t}
                className="font-inter text-sm blue_gradient cursor-pointer"
                onClick={() => handleClickTag && handleClickTag(t)}
              >
                #{t}
              </p>
            ))
          : ""}
      </div>

      {session?.user?.id === promptDetails?.creator?._id &&
        pathName === "/profile" && (
          <div className="mt-5 flex justify-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEditPrompt}
            >
              Edit
            </p>

            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDeletePrompt}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
