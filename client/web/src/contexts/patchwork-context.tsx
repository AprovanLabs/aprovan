import { createContext, useContext } from "react";
import type { Compiler } from "@aprovan/patchwork";

export interface PatchworkContext {
  compiler: Compiler | null;
  namespaces: string[];
}

export const PatchworkCtx = createContext<PatchworkContext>({
  compiler: null,
  namespaces: [],
});

export const useCompiler = () => useContext(PatchworkCtx).compiler;
export const useServices = () => useContext(PatchworkCtx).namespaces;
