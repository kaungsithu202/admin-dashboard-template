import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Card for displaying a list of fields
 */
export type EntityInfoField = {
  label: string;
  value: ReactNode;
};

export function EntityInfoCard({ 
  title, 
  fields, 
  children,
  className 
}: { 
  title: string; 
  fields?: EntityInfoField[]; 
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {fields?.map((field, index) => (
          <div key={`${field.label}-${index}`} className="grid grid-cols-2 gap-4 border-b pb-4 last:border-0 last:pb-0">
            <span className="font-semibold text-muted-foreground">{field.label}</span>
            <span>{field.value ?? "N/A"}</span>
          </div>
        ))}
        {children}
      </CardContent>
    </Card>
  );
}
