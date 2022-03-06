import React from "react";

import Seo from "../../components/seo";
import SiteHeader from "../../components/site-header";
import PageSection, {
  PageSectionBreadcrumbs,
  PageSectionHeader,
} from "../../components/page-section";
import Emails from "../../content/emails";

const EmailsWelcome = (props) => {
  const badge = "Daily emails";
  const title = "Welcome";
  const description = <>You'll hear from us shortly&nbsp;📬</>;
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
        </PageSection>
        <PageSection>
          <PageSectionHeader title="Latest emails" />
          <Emails more />
        </PageSection>
      </main>
    </>
  );
};

export default EmailsWelcome;
