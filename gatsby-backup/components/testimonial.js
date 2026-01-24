import React from "react";
import clsx from "clsx";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Prose from "./prose";

const Testimonial = ({
  who,
  url,
  avatar,
  company,
  attended,
  children,
  sx,
  className,
  ...props
}) => {
  return (
    <blockquote
      component="blockquote"
      className={clsx(
        "m-0 px-6 pt-3 pb-5 border-solid border-4 border-yellow-400",
        className
      )}
      {...props}
    >
      <Prose>{children}</Prose>
      <div className="flex items-center gap-4 mt-6">
        <GatsbyImage
          className="h-20 w-20 rounded-full drop-shadow"
          image={getImage(avatar)}
          alt={who}
        />

        <cite className="text-sm leading-tight">
          {who && !url && <span className="font-semibold">{who}</span>}
          {who && url && (
            <a
              className="font-semibold text-inherit underline underline-offset-2 decoration-transparent decoration-wavy hover:decoration-amber-600 transition-all ease-in-out duration-300"
              href={url}
            >
              {who}
            </a>
          )}

          {attended && (
            <>
              <br /> Attended {attended}
            </>
          )}
          {company && (
            <>
              <br />
              <a
                className="font-semibold text-inherit underline underline-offset-2 decoration-transparent decoration-wavy hover:decoration-amber-600 transition-all ease-in-out duration-300"
                href={company.url}
              >
                {company.name}
              </a>
            </>
          )}
        </cite>
      </div>
    </blockquote>
  );
};

export default Testimonial;
