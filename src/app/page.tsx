import { getUser } from "@/auth/server";

import { AskAIButton } from "@/components/AskAIButton";
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  // const noteIdParam = (await searchParams).noteId;
  // const user = await getUser();

  // const noteId = Array.isArray(noteIdParam)
  //   ? noteIdParam![0]
  //   : noteIdParam || "";

  // const note = await prisma.note.findUnique({
  //   where: {
  //     id: noteId,
  //     authorId: user?.id,
  //   },
  // });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        {/* <AskAIButton user={user!} /> */}
        {/* <NewNoteButton user={} /> */}
      </div>

      {/* <NoteTextInput notepad={noteId} startingNoteText={note?.text || ""} /> */}
    </div>
  );
}
