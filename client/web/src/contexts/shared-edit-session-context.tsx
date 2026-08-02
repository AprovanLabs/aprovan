import { createContext, useContext } from "react";
import type { VirtualProject } from "@aprovan/patchwork-compiler";

export const SharedEditSessionCtx = createContext<
  | ((session: {
      projectId: string;
      entryFile: string;
      filePath?: string;
      initialCode: string;
      initialProject: VirtualProject;
    }) => void)
  | null
>(null);

export const useSharedEditSession = () => useContext(SharedEditSessionCtx);
