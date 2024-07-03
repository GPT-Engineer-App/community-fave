import React from "react";
import { cn } from "@/lib/utils";

const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "bg-white border border-secondary-light-gray rounded-lg shadow-sm",
      className
    )}
    {...props}
  />
);

const CardHeader = ({ className, ...props }) => (
  <div className={cn("p-4 border-b border-secondary-light-gray", className)} {...props} />
);

const CardTitle = ({ className, ...props }) => (
  <h2 className={cn("text-lg font-semibold", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-4", className)} {...props} />
);

const CardFooter = ({ className, ...props }) => (
  <div className={cn("p-4 border-t border-secondary-light-gray", className)} {...props} />
);

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
