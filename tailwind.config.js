/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: (theme) => ({
        brown: {
          css: {
            "--tw-prose-body": theme("colors.brown[900]"),
            "--tw-prose-headings": theme("colors.brown[900]"),
            "--tw-prose-lead": theme("colors.brown[800]"),
            "--tw-prose-links": theme("colors.teal[950]"),
            "--tw-prose-bold": theme("colors.brown[900]"),
            "--tw-prose-counters": theme("colors.amber[500]"),
            "--tw-prose-bullets": theme("colors.amber[500]"),
            "--tw-prose-hr": theme("colors.amber[300]"),
            "--tw-prose-quotes": theme("colors.brown[900]"),
            "--tw-prose-quote-borders": theme("colors.amber[500]"),
            "--tw-prose-captions": theme("colors.brown[700]"),
            "--tw-prose-code": theme("colors.brown[900]"),
            "--tw-prose-pre-code": theme("colors.brown[100]"),
            "--tw-prose-pre-bg": theme("colors.brown[900]"),
            "--tw-prose-th-borders": theme("colors.brown[300]"),
            "--tw-prose-td-borders": theme("colors.brown[200]"),
            "--tw-prose-invert-body": theme("colors.brown[200]"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.brown[300]"),
            "--tw-prose-invert-links": theme("colors.white"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.brown[400]"),
            "--tw-prose-invert-bullets": theme("colors.brown[600]"),
            "--tw-prose-invert-hr": theme("colors.brown[700]"),
            "--tw-prose-invert-quotes": theme("colors.brown[100]"),
            "--tw-prose-invert-quote-borders": theme("colors.brown[700]"),
            "--tw-prose-invert-captions": theme("colors.brown[400]"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.brown[300]"),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("colors.brown[600]"),
            "--tw-prose-invert-td-borders": theme("colors.brown[700]"),
          },
        },
        DEFAULT: {
          css: {
            a: {
              "&:hover": {
                textDecorationColor: "transparent",
              },
            },
            code: {
              fontSize: "0.8em !important",
            },
            ol: {
              listStylePosition: "inside",
            },
            li: {
              textWrap: "pretty",
            },
            "ol > li::marker": {
              fontWeight: 900,
              display: "inline-block",
              marginRight: "0.5rem",
            },
            "div > ul > li::marker": {
              content: "''",
            },
            "div > ul > li::before": {
              color: "var(--tw-prose-bullets)",
              content: "'➽'",
              display: "inline-block",
              marginRight: "0.5rem",
            },
            "div > ul ul": {
              marginTop: 0,
            },
            "div > ul ul li:first-child": {
              marginTop: 0,
            },
            "blockquote p:first-of-type::before": {
              content: "none",
            },
            "blockquote p:last-of-type::after": {
              content: "none",
            },
            "blockquote cite": {
              display: "block",
              marginTop: "0.5rem",
              fontSize: "0.8125rem",
              fontStyle: "normal",
            },
          },
        },
      }),
    },
  },
};
