"use client";

import { usePathname } from "next/navigation";

export const RequestedPath = () => {
  const pathname = usePathname();

  return <code className="font-mono">{pathname}</code>;
};
