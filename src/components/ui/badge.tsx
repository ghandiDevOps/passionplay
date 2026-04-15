import { cn } from "@/lib/utils/cn";
import type { SessionType } from "@prisma/client";

interface SessionTypeBadgeProps {
  type: SessionType;
  className?: string;
}

export function SessionTypeBadge({ type, className }: SessionTypeBadgeProps) {
  if (type === "discovery") {
    return (
      <span className={cn("badge-discovery", className)}>
        🟢 Découverte
      </span>
    );
  }

  return (
    <span className={cn("badge-progression", className)}>
      🔵 Progression
    </span>
  );
}

// Badge générique
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

const badgeVariants = {
  default: "bg-gray-100 text-gray-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger:  "bg-red-100 text-red-700",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full",
        badgeVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
