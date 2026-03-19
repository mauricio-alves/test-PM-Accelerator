import React from "react";

export interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassContainer({ children, className = "" }: Readonly<GlassContainerProps>) {
  return <div className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl ${className}`}>{children}</div>;
}
