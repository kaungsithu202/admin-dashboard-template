import placeholder from "/placeholder.png";
import { cn } from "@/lib/utils";

type EntityTableImageProps = {
  src?: string | null;
  alt?: string;
  className?: string;
};

export function EntityTableImage({ src, alt = "", className }: EntityTableImageProps) {
  return (
    <img
      src={src || placeholder}
      alt={alt}
      width={200}
      height={200}
      className={cn("w-20 h-20 object-contain", className)}
    />
  );
}
