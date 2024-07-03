import React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const Button = React.forwardRef(({ className, variant, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-primary-blue text-white hover:bg-blue-700 shadow-md",
    secondary: "bg-primary-green text-white hover:bg-green-700 shadow-md",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700 shadow-md",
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
