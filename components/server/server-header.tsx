"use client";

import { MemberRole } from "@/lib/generated/prisma";
import { ServerWithMembersWithProfiles } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  Plus,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <button className="w-full text-md font-semibold px-3 flex justify-between items-center h-12 border-secondary transition hover:bg-primary/15 hover:cursor-pointer">
            {server.name}
            <ChevronDown className="size-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-xs font-medium dark:text-white/75 space-y-[2px] dark:bg-slate-950">
          {isModerator && (
            <DropdownMenuItem
              onClick={() => onOpen("invite", { server })}
              className="px-3 py-2 text-sm cursor-pointer flex justify-between"
            >
              Invite People
              <UserPlus className="size-4" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              onClick={(() => onOpen("editServer", { server }))}
              className="px-3 py-2 text-sm cursor-pointer flex justify-between"
            >
              Server Settings
              <Settings className="size-4" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer flex justify-between">
              Manage Members
              <Users className="size-4" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer flex justify-between">
              Create Channel
              <Plus className="size-4" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuSeparator className="bg-secondary w-[98%] mx-auto " />
          )}
          {isAdmin && (
            <DropdownMenuItem
              variant="destructive"
              className="px-3 py-2 text-sm cursor-pointer text-rose-500 flex justify-between group"
            >
              <span className="group-hover:text-rose-500">Delete Server</span>
              <Trash className="size-4 text-rose-500" />
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <DropdownMenuItem
              variant="destructive"
              className="px-3 py-2 text-sm cursor-pointer text-rose-500 flex justify-between group"
            >
              <span className="group-hover:text-rose-500">Leave Server</span>
              <LogOut className="size-4 text-rose-500" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
