import React from "react";

export function Badge({ component: Component = "span", children, ...props }) {
  return (
    <Component
      className="mr-2 inline-flex underline-offset-2 items-center rounded-md border-style bg-amber-100 hover:bg-amber-200 hover:decoration-amber-600 transition px-2.5 py-0.5 text-xs font-medium text-stone-800"
      {...props}
    >
      {children}
    </Component>
  );
}
