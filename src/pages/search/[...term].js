import React, { useEffect, useState, useRef, useMemo } from "react";
import { graphql, navigate } from "gatsby";
import { debounce, set } from "lodash";
import clsx from "clsx";
import Fuse from "fuse.js";

import PageHead from "../../components/page-head";
import SiteHeader from "../../components/site-header";
import PageSection, { PageSectionHeader } from "../../components/page-section";

import { Newsletter } from "../../components/newsletter";
import { Emails } from "../../components/emails";

const FUSE_OPTIONS = {
  includeScore: true,
  ignoreLocation: true,
  includeMatches: true,
  shouldSort: true,
  useExtendedSearch: true,
  minMatchCharLength: 3,
  threshold: 0.4,
  keys: [
    "title",
    "tags.label",
    {
      name: "description",
      weight: 0.7,
    },
  ],
};

const TITLE = "Search all Gatsby Treasures";

export function Head(props) {
  return (
    <PageHead
      {...props}
      meta={{
        title: TITLE,
      }}
    />
  );
}

export default function SearchPage(props) {
  const { data, path, term } = props;

  const fuseRef = useRef(new Fuse(data.allEmail.nodes, FUSE_OPTIONS));
  const [input, setInput] = useState(term || "");
  const [results, setResults] = useState([]);

  const debouncedChangeHandler = useMemo(() => {
    return debounce((newTerm) => {
      if (newTerm !== term) {
        navigate(path.replace("*term", newTerm));
      }
    }, 400);
  }, [path, term]);

  useEffect(() => {
    debouncedChangeHandler(input);
  }, [input, debouncedChangeHandler]);

  useEffect(() => {
    setInput(term);
    setResults(fuseRef.current.search(term, { limit: 7 }));
  }, [term]);

  return (
    <>
      <SiteHeader {...props} />
      <main>
        <PageSection component="header">
          <label htmlFor="search" className="sr-only">
            Email
          </label>
          <input
            autoFocus={true}
            type="search"
            name="search"
            id="search"
            className={clsx(
              "font-medium w-full flex-grow border-solid transition border-2 border-teal-900",
              "focus:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500"
            )}
            placeholder="Type to search..."
            onChange={(event) => setInput(event.target.value)}
          />

          {results.length === 0 && term && (
            <p className="mt-12 pl-1 text-lg font-bold">
              No results for <em>{term}</em>
            </p>
          )}
          {results.length > 0 && (
            <Emails
              variant="detailed"
              emails={results.map((resultItem) => {
                resultItem.matches.forEach((matchItem) => {
                  const text = matchItem.value;
                  const matches = [...matchItem.indices];
                  let highlighted = "";
                  let pair = matches.shift();

                  for (var i = 0; i < text.length; i++) {
                    var char = text.charAt(i);
                    if (pair && i === pair[0]) {
                      highlighted += "<mark>";
                    }
                    highlighted += char;
                    if (pair && i === pair[1]) {
                      highlighted += "</mark>";
                      pair = matches.shift();
                    }
                  }

                  const key = matchItem.key.split(".");
                  if (matchItem.refIndex >= 0) {
                    key.splice(1, 0, matchItem.refIndex);
                  }
                  set(resultItem.item, key, highlighted);
                });
                return resultItem.item;
              })}
              className="mt-8"
            />
          )}
        </PageSection>

        <PageSection>
          <PageSectionHeader badge="Latest emails" />
          <Emails limit={3} className="mt-8" />
        </PageSection>

        <PageSection component="footer">
          <Newsletter />
        </PageSection>
      </main>
    </>
  );
}

export const query = graphql`
  {
    allEmail(sort: { slug: DESC }) {
      nodes {
        ...EmailItemFragment
      }
    }
  }
`;
