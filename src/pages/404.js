import React from "react";

import Seo from "../components/seo";
import MainMenu from "../content/main-menu";
import SocialLinks from "../content/social-links";
import DefaultLayout from "../templates/default";

const NotFoundPage = (props) => {
  return (
    <DefaultLayout>
      <Seo {...props} meta={{ title: "Not found" }} />

      <header>
        <h1>
          Sorry{" "}
          <span role="img" aria-label="Pensive emoji">
            😔
          </span>{" "}
          we couldn’t find what you were looking for.
        </h1>
        <nav>
          <MainMenu />
          <SocialLinks />
        </nav>
      </header>

      <section>
        <img src="https://http.cat/404" alt="Cat hiding, but clearly visible" />
      </section>
    </DefaultLayout>
  );
};

export default NotFoundPage;
