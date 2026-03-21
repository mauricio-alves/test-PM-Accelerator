import React from "react";

type AsProp = "div" | "article" | "section" | "form" | "li";

export interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: AsProp;
  "aria-label"?: string;
}

export function GlassContainer({ children, className = "", as: Tag = "div", "aria-label": ariaLabel }: Readonly<GlassContainerProps>) {
  return (
    <Tag className={`bg-(--card-bg) backdrop-blur-md border border-(--card-border) rounded-2xl shadow-xl ${className}`} aria-label={ariaLabel}>
      {children}
    </Tag>
  );
}
