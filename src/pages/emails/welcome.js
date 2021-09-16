import React from "react";

import Layout from "../../templates/default";
import Seo from "../../components/seo";

import MainMenu from "../../content/main-menu";
import SocialLinks from "../../content/social-links";

const EmailsWelcome = (props) => {
  return (
    <Layout>
      <Seo {...props} meta={{ title: "Emails from the Queen" }} />
      <main>
        <header>
          <h1>
            Welcome! You'll hear from
            <span>
              me shortly{" "}
              <span role="img" aria-label="Mailbox">
                📬
              </span>
            </span>
          </h1>
        </header>
      </main>
      <footer>
        <nav>
          <MainMenu />
          <SocialLinks />
        </nav>
      </footer>
    </Layout>
  );
};

export default EmailsWelcome;
