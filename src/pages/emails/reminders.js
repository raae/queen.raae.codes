import React from "react";

import PageHead from "../../components/page-head";
import SiteHeader from "../../components/site-header";
import PageSection, {
  PageSectionBreadcrumbs,
  PageSectionHeader,
} from "../../components/page-section";
import Prose from "../../components/prose";
import { Newsletter } from "../../components/newsletter";

const BADGE = "Emails";
const TITLE = "Reminders";
const DESCRIPTION = "Live stream reminders";

export function Head(props) {
  return (
    <PageHead
      {...props}
      meta={{ title: `${BADGE} - ${TITLE}`, description: DESCRIPTION }}
    />
  );
}

export default function EmailRemindersPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageSection component="header">
          <PageSectionBreadcrumbs
            className="mt-4"
            items={[{ label: BADGE, to: ".." }, { label: TITLE }]}
          />
          <PageSectionHeader title={DESCRIPTION} hLevel={1} />
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
          <Newsletter mt="2em" formKey="reminders" cta="Yes, please" />
        </PageSection>
      </main>
    </>
  );
}
