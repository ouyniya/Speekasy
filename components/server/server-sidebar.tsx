import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@/lib/generated/prisma";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channel: {
        orderBy: {
          createdAt: "asc",
        },
      },
      member: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = server?.channel.filter(
    (item) => item.type === ChannelType.TEXT
  );
  const audioChannels = server?.channel.filter(
    (item) => item.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channel.filter(
    (item) => item.type === ChannelType.VIDEO
  );
  const members = server?.member.filter(
    (item) => item.profileId !== profile.id
  );

  if (!server) {
    return redirect("/");
  }

  const role = server.member.find(
    (item) => item.profileId === profile.id
  )?.role;

  return (
    <>
      <div className="flex flex-col h-full text-primary w-full bg-primary/5">
        <ServerHeader server={server} role={role} />
      </div>
    </>
  );
};
