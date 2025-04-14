"use client";

import { useRouter } from "next/navigation";
import { setToast } from "@/lib/toast";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useActionState, useEffect } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { handleSubmit, FormState } from "@/actions/users";

type Props = {
  type: "login" | "signUp";
};

export const AuthForm = ({ type }: Props) => {
  const isLoginForm = type === "login";

  const router = useRouter();

  const initialState: FormState = {
    errors: {},
    success: false,
    errorMessage: null,
  };

  const [state, formAction, isPending] = useActionState(
    handleSubmit.bind(null, isLoginForm),
    initialState,
  );

  useEffect(() => {
    if (state.success && !state.errorMessage) {
      const title = isLoginForm ? "Logged In" : "Signed Up";

      const description = isLoginForm
        ? "You have successfully logged in"
        : "Check your email for confirmation link.";

      setToast("success", title, description);

      router.replace("/");
    } else if (state.errorMessage) {
      setToast("error", "Error", state.errorMessage);
    }
  }, [state, isLoginForm, router]);

  return (
    <form action={formAction}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            disabled={isPending}
          />
          {state.errors.email && (
            <p className="text-xs text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            disabled={isPending}
          />
          {state.errors.password && (
            <p className="text-xs text-red-500">{state.errors.password}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="mt-5 flex flex-col gap-6">
        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-xs">
          {isLoginForm
            ? "Don't have an account yet?"
            : "Already have an account?"}{" "}
          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className={`text-blue-500 ${isPending ? "pointer-events-none opacity-50" : ""}`}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};
