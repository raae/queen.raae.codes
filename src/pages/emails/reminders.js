import React from "react";

import Seo from "../../components/seo";
import SiteHeader from "../../components/site-header";
import PageSection, {
  PageSectionBreadcrumbs,
  PageSectionHeader,
} from "../../components/page-section";
import Prose from "../../components/prose";
import NewsletterForm from "../../components/newsletter";

const EmailRemindersPage = (props) => {
  const badge = "Emails";
  const title = "Reminders";
  const description = "Live stream reminders";
  return (
    <>
      <Seo {...props} meta={{ title: `${title} · ${badge}`, description }} />
      <SiteHeader />
      <main>
        <PageSection component="header">
          <PageSectionBreadcrumbs
            items={[{ label: badge, to: ".." }, { label: title }]}
          />
          <PageSectionHeader title={description} hLevel={1} />
          <Prose>
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
          </Prose>
          <NewsletterForm mt="2em" formKey="reminders" cta="Yes, please" />
        </PageSection>
      </main>
    </>
  );
};

export default EmailRemindersPage;
