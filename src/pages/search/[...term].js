import React, { useEffect, useState, useRef, useMemo } from "react";
import Fuse from "fuse.js";
import { graphql, navigate } from "gatsby";
import { debounce } from "lodash";

import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Cancel as ResetIcon } from "@mui/icons-material";

import Seo from "../../components/seo";
import SiteHeader from "../../components/site-header";
import PageSection, { PageSectionHeader } from "../../components/page-section";

import { Newsletter } from "../../content/newsletter";
import Emails from "../../content/emails";

const FUSE_OPTIONS = {
  includeScore: true,
  ignoreLocation: true,
  includeMatches: true,
  shouldSort: true,
  useExtendedSearch: true,
  keys: [
    "title",
    "tags.label",
    {
      name: "description",
      weight: 0.7,
    },
  ],
};

const SearchPage = (props) => {
  const { data, path, uri, term } = props;
  const title = "Search all daily emails";
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
    console.log("term change", term);
    setInput(term);
    setResults(fuseRef.current.search(term, { limit: 7 }));
  }, [term]);

  return (
    <>
      <Seo
        {...props}
        meta={{
          title: title,
        }}
      />
      <SiteHeader {...props} />
      <main>
        <PageSection component="header">
          <TextField
            autoFocus
            fullWidth
            shrink
            label={title}
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
                    {input && <ResetIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {results.length > 0 && (
            <Emails
              variant="detailed"
              emails={results.map(({ item }) => item)}
              sx={{ mt: 4 }}
            />
          )}
        </PageSection>

        <PageSection>
          <>
            <PageSectionHeader badge="Latest emails" />
            <Emails limit={3} />
          </>
        </PageSection>

        <PageSection component="footer">
          <Newsletter />
        </PageSection>
      </main>
    </>
  );
};

export const query = graphql`
  {
    allEmail(sort: { order: DESC, fields: slug }) {
      nodes {
        ...EmailItemFragment
      }
    }
  }
`;

export default SearchPage;
