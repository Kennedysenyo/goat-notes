"use server";

import { createClient } from "@/auth/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { handleError } from "@/lib/utils";

type Errors = {
  email?: string;
  password?: string;
};

export type FormState = {
  errors: Errors;
  success: boolean;
  errorMessage: string | null;
};

export async function loginAction(
  email: string,
  password: string,
): Promise<string | null> {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signInWithPassword({ email, password });

    if (error) throw error;

    return null;
  } catch (error) {
    return handleError(error);
  }
}

export async function logOutAction(): Promise<string | null> {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();

    if (error) throw error;

    return null;
  } catch (error) {
    return handleError(error);
  }
}

export async function signUpAction(
  email: string,
  password: string,
): Promise<string | null> {
  try {
    const { auth } = await createClient();
    const { data, error } = await auth.signUp({ email, password });

    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error("Error Signing Up!");

    // add user to database
    await db.insert(users).values({ id: userId, email });

    return null;
  } catch (error) {
    return handleError(error);
  }
}

export const handleSubmit = async (
  isLoginForm: boolean,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: Errors = {};

  if (!email) errors.email = "Email is required!";
  if (!password) errors.password = "Password is required!";

  if (Object.keys(errors).length !== 0)
    return { errors, success: false, errorMessage: null };

  const errorMessage = isLoginForm
    ? await loginAction(email, password)
    : await signUpAction(email, password);

  if (errorMessage) return { errors: {}, success: false, errorMessage };

  return { errors: {}, success: true, errorMessage: null };
};
