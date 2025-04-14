import React from "react";
import Link from "next/link";
import Image from "next/image";
import { shadow } from "@/styles/utils";
import { Button } from "./ui/button";
import { DarkModeToggle } from "./DarkModeToggle";
import { LogOutButton } from "./LogOutButton";
import { getUser } from "@/auth/server";

export const Header = async () => {
  const user = await getUser();

  return (
    <header
      className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-8"
      style={{
        boxShadow: shadow,
      }}
    >
      <Link className="flex items-end gap-2" href="/">
        <Image
          src="/goatius.png"
          alt="logo"
          height={60}
          width={60}
          className="rounded-full"
          priority
        />

        <h1 className="leadiing-6 flex flex-col pb-1 text-2xl font-semibold">
          GOAT <span>Notes</span>
        </h1>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <LogOutButton />
        ) : (
          <>
            <Button asChild className="hidden sm:block">
              <Link href="/sign-up">Sign Up</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}

        <DarkModeToggle />
      </div>
    </header>
  );
};
