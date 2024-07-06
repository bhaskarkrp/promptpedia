"use client";

import { useState, useEffect } from "react";
import Profile from "@components/Profile";
import { Creator } from "@interfaces/Interface";
import Loader from "@components/Loader";

const UserProfile = ({ params }: { params: { user_id: string } }) => {
  const [allPrompts, setAllPrompts] = useState([]);
  const [userDetails, setUserDetails] = useState<Creator>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${params.user_id}/prompts`);
      const data = await response.json();

      if (data?.length) {
        setAllPrompts(data);
        const userDetails = data?.[0].creator;

        setUserDetails(userDetails);
      }
      setIsLoading(false);
    };

    if (params.user_id) fetchPrompts();
  }, [params.user_id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Profile
      name={`${userDetails?.username ? userDetails?.username + "'s" : ""}`}
      desc="Welcome to my personalised profile page."
      data={allPrompts}
    />
  );
};

export default UserProfile;
