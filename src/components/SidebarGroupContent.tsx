"use client";

import { Note } from "@/db/schema";

type Props = {
  notes: Note[];
};

export const SidebarGroupContent = ({ notes }: Props) => {
  console.log(notes);
  return <div>Your notes here</div>;
};
