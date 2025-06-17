"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Create Server">
        <button 
        onClick={() => onOpen("createServer")}
        className="group flex items-center cursor-pointer">
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background group-hover:bg-violet-600/50">
            <Plus className="group-hover:text-white transition text-primary" />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
