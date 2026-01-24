import clsx from "clsx";
import React from "react";

export function Badge({ component: Component = "span", children, ...props }) {
  return (
    <Component
      className={clsx(
        "inline-flex items-center rounded-md px-2.5 py-0.5",
        "border-style bg-amber-100 hover:bg-amber-200",
        "underline underline-offset-2 hover:decoration-amber-600 transition",
        "text-xs font-medium text-brown-900"
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
