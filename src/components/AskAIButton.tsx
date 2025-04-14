"use client";
import { User } from "@supabase/supabase-js";
type Props = {
  user: User;
};

export const AskAIButton = ({ user }: Props) => {
  return <div>{user.email}</div>;
};
