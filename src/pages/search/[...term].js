import React, { useEffect, useState, useRef, useMemo } from "react";
import Fuse from "fuse.js";
import { graphql, navigate } from "gatsby";
import { debounce, set } from "lodash";

import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";

import { XCircleIcon as ResetIcon } from "@heroicons/react/20/solid";

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
  const { data, path, uri, term } = props;

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
          <TextField
            autoFocus={!term}
            fullWidth
            shrink
            label={TITLE}
            value={input}
            InputLabelProps={{ shrink: true }}
            onChange={(event) => setInput(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="reset search"
                    onClick={() => navigate(uri)}
                    edge="end"
                  >
                    {input && <ResetIcon className="h-5" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {results.length === 0 && term && (
            <Typography sx={{ mt: 4 }}>No results...</Typography>
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
              sx={{ mt: 4 }}
            />
          )}
        </PageSection>

        <PageSection>
          <PageSectionHeader badge="Latest emails" />
          <Emails limit={3} />
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
    allEmail(sort: { order: DESC, fields: slug }) {
      nodes {
        ...EmailItemFragment
      }
    }
  }
`;
