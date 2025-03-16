import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

export default function RoleCard({
  title,
  description,
  icon,
  isSelected,
  onClick
}: RoleCardProps) {
  return (
    <Card
      className={cn(
        "hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1 border-2",
        isSelected 
          ? "border-primary bg-primary/5" 
          : "border-transparent hover:border-primary/50"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className="bg-primary/10 p-4 inline-block rounded-full mb-4">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        
        <p className="text-muted-foreground text-sm">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
