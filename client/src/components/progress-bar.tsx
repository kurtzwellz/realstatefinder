import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export default function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div 
      className={cn(
        "h-2 bg-gray-100 rounded-full overflow-hidden w-full",
        className
      )}
    >
      <div 
        className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
