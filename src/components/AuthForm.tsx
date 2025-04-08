"use client";

import { useRouter } from "next/navigation";
import { setToast } from "@/lib/toast";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type Props = {
  type: "login" | "signUp";
}

export const AuthForm = ({type}: Props) => {
  const isLogginForm = type === "login";

  const router = useRouter();

  // call setToast method 

  const [isPending, startTransition] = useTransition()

  const handleSubmit = (formData: FormData) => {
    console.log("Form submitted ...")
  }

  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
           id="email"
           name="email"
           type="email"
           placeholder="Enter your email"
           required
           disabled={isPending}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
           id="password"
           name="password"
           type="password"
           placeholder="Enter your password"
           required
           disabled={isPending}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-5 flex flex-col gap-6">
        <Button className="w-full">
          {isPending ? 
          <Loader2 className="animate-spin" /> : isLogginForm ? 
          "Login" : "Sign Up"}
        </Button>
        <p className="text-xs">
          {isLogginForm ? "Don't have an account yet?" : "Already have an account?"}{" "}
          <Link href={isLogginForm ? "/sign-up": "/login"} className={`text-blue-500 ${isPending ? "pointer-events-none opacity-50" : ""}`} >
            {isLogginForm ? "Sign Up" : "Login"}
          </Link>
          </p>
        
      </CardFooter>
    </form>
  )
}