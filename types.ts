import { Member, Profile, Server } from "./lib/generated/prisma";

export type ServerWithMembersWithProfiles = Server & {
  member: (Member & { profile: Profile })[];
};
