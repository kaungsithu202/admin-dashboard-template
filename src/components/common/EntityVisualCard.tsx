import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Card for displaying a visual (image/icon)
 */
export function EntityVisualCard({ 
  title, 
  src, 
  alt, 
  fallback,
  className,
  aspectRatio = "square"
}: { 
  title: string; 
  src?: string | null; 
  alt?: string;
  fallback?: string;
  className?: string;
  aspectRatio?: "square" | "video";
}) {
  const aspectClass = aspectRatio === "square" ? "aspect-square max-[400px]" : "aspect-video";
  const imageClass = aspectRatio === "square" ? "object-contain" : "object-cover";

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center p-6">
        <div className={cn(
          "relative w-full overflow-hidden rounded-xl border bg-muted shadow-inner flex items-center justify-center p-4",
          aspectClass
        )}>
          <img
            src={src || fallback}
            alt={alt}
            className={cn("h-full w-full", imageClass)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
