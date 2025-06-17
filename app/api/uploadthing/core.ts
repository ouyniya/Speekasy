import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

const hdlAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId: userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => hdlAuth())
    .onUploadComplete(() => {}),

  messageFile: f(["image", "pdf"])
    .middleware(async () => hdlAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
