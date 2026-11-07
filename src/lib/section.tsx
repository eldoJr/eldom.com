"use client";

import { createContext, useContext, useState } from "react";

type Section = "Home" | "About" | "Work" | "Contact";

const ctx = createContext<{
  section: Section;
  setSection: (s: Section) => void;
}>({ section: "Home", setSection: () => {} });

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [section, setSection] = useState<Section>("Home");
  return <ctx.Provider value={{ section, setSection }}>{children}</ctx.Provider>;
}

export const useSection = () => useContext(ctx);
