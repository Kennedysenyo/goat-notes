import { getUser } from "@/auth/server";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { db } from "@/db";
import { notes } from "@/db/schema";
import Link from "next/link";
import { SidebarGroupContent } from "./SidebarGroupContent";
import { eq } from "drizzle-orm";
import { Note } from "@/db/schema";

export const AppSidebar = async () => {
  const user = await getUser();

  let userNotes: Note[];

  if (user) {
    userNotes = await db
      .select()
      .from(notes)
      .where(eq(notes.authorId, user.id));
  }
  return (
    <Sidebar>
      <SidebarContent className="custom-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel className="mt-2 mb-2 text-lg">
            {user ? (
              "Your Notes"
            ) : (
              <p>
                <Link href="/login" className="underline">
                  Login
                </Link>{" "}
                to see your notes
              </p>
            )}
          </SidebarGroupLabel>
          {/* {user && <SidebarGroupContent notes={notes} />} */}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
