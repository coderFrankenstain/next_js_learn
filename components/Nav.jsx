"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        ></Image>
        <p className=" logo_text">Promptopia</p>
      </Link>

      {/* { Destop Navigation} */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className=" flex gap-3 md:gap-5">
            <Link href="/create" className=" black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className=" outline_btn">
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={"/images/logo.svg"}
                width={37}
                height={37}
                alt="profile"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  typt="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>


        {/* { mobile Navigation} */}
        <div className="sm:hidden flex relative">
          {isUserLoggedIn ? (
            <div className="flex">
              <Image
                src="/images/logo.svg"
                alt="Profile"
                width={37}
                height={37}
                className=" rounded-full"
                onClick={() => setToggleDropdown((pre) => !pre)}
              />

              {/* {toggleDropdown && (
                <div className=" dropdown">
                  <Link
                    href={"/profile"}
                    className=" dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                </div>
              )} */}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    typt="button"
                    key={provider.name}
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
