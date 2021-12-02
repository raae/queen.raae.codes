import React from "react";

import Seo from "../../components/seo";

import MainMenu from "../../content/main-menu";
import SocialLinks from "../../content/social-links";
import NewsletterSection from "../../content/newsletter-section";
import NewsletterForm from "../../components/newsletter";

const EmailRemindersPage = (props) => {
  return (
    <>
      <Seo {...props} meta={{ title: "Stream reminders from the Queen" }} />
      <main>
        <header>
          <h1>
            Live stream reminders from{" "}
            <span>
              yours truly{" "}
              <span
                role="img"
                aria-label="Live on air red circle and notification bell emojii"
              >
                🔴 🔔
              </span>
            </span>
          </h1>
        </header>

        <section>
          <NewsletterForm formKey="reminders" cta="Yes, please">
            <p>
              Receive a reminder via email 30 minutes before we go live on the{" "}
              <a href="https://www.youtube.com/channel/UCDlrzlRdM1vGr8nO708KFmQ">
                Queen Raae YouTube channel
              </a>
              .<br />
              <small>
                (The YouTube notfications system cannot be trusted{" "}
                <span role="img" aria-label="Facepalm emojii">
                  🤦‍♀️
                </span>{" "}
                )
              </small>
            </p>
          </NewsletterForm>
        </section>
      </main>
      <footer>
        <nav>
          <MainMenu />
          <SocialLinks />
        </nav>
      </footer>
    </>
  );
};

export default EmailRemindersPage;
