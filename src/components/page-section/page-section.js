import * as React from "react";

export const PageSection = ({ children, component = "section", ...props }) => {
  const Component = component || "section";
  return (
    <Component {...props} className="py-12 px-6 bg-[#fffaf0] even:bg-[#fcedd8]">
      <div className="container mx-auto max-w-2xl [&>*]:max-w-xl">
        {children}
      </div>
    </Component>
  );
};
