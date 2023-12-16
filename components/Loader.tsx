import clsx from "clsx";
import { Loader2 } from "lucide-react";

export const Loader = ({ className }: { className?: string }) => (
  <div className={clsx(className)}>
    <Loader2 className="animate-spin opacity-50" />
  </div>
);
