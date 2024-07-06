"use client";

import Image from "next/image";
import Link from "next/link";
import {
  signIn,
  signOut,
  getProviders,
  useSession,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { useEffect, useState } from "react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { useRouter } from "next/navigation";

const Nav = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  useEffect(() => {
    if (!session?.user?.id) {
      router.push("/");
    }
  }, [session?.user?.id]);

  return (
    <nav className="flex w-full mb-16 pt-3 justify-between">
      <Link href="/" className="flex gap-2 items-center">
        <Image
          src="/assets/images/logo.svg"
          alt="PromptPedia Logo"
          width={40}
          height={40}
        />

        <p className="logo_text">PromptPedia</p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-post" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              className="outline_btn"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user?.image || "/assets/images/logo.svg"}
                alt="Profile Image"
                width={37}
                height={37}
                className="rounded-full cursor-pointer"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Image
              src={session?.user?.image || "/assets/images/logo.svg"}
              alt="Profile Image"
              width={37}
              height={37}
              className="cursor-pointer rounded-full"
              onClick={() => setIsDropDownOpen((prev) => !prev)}
            ></Image>
            {isDropDownOpen && (
              <div className="dropdown pb-2">
                <Link href="/profile" className="dropdown_link mt-3">
                  My Profile
                </Link>
                <Link href="/create-post" className="dropdown_link mt-3">
                  Create Post
                </Link>
                <button
                  type="button"
                  className="outline_btn dropdown_link w-full mt-5"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
