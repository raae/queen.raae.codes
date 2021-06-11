import React from "react";
import { Link } from "gatsby";
import { PageLayout } from "../components/PageLayout";

// markup
const NotFoundPage = () => {
  return (
    <PageLayout>
      <title>Not found</title>
      <h1>Page not found</h1>
      <p>
        Sorry{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in <>src/pages/</>.
            <br />
          </>
        ) : null}
        <br />
        <Link to="/">Go home</Link>.
      </p>
    </PageLayout>
  );
};

export default NotFoundPage;
