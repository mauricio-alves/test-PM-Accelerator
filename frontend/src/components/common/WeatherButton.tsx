import { ReactNode } from "react";

interface WeatherButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "danger" | "iconOnly";
  className?: string;
}

export function WeatherButton({ children, icon, variant = "primary", className = "", ...props }: Readonly<WeatherButtonProps>) {
  const baseStyles = "flex items-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer";

  const variants = {
    primary: "px-3 py-1.5 rounded-lg bg-(--accent) hover:bg-(--accent-hover) hover:scale-105 border border-(--card-border) text-xs font-medium",
    danger: "px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:scale-105 border border-red-500/20 text-xs font-medium",
    iconOnly: "p-2 rounded-full bg-(--accent) hover:bg-(--accent-hover) hover:scale-110",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {icon}
      {children}
    </button>
  );
}
