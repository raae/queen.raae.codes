import React from "react";

import PageHead from "../../components/page-head";
import SiteHeader from "../../components/site-header";
import PageSection, {
  PageSectionBreadcrumbs,
  PageSectionHeader,
} from "../../components/page-section";
import Emails from "../../components/emails";

const BADGE = "Daily Gatsby Treasures";
const TITLE = "Welcome";
const DESCRIPTION = <>You'll hear from us shortly&nbsp;📬</>;
const META_DESCRIPTION = "You'll hear from us shortly 📬";

export function Head(props) {
  return (
    <PageHead
      {...props}
      meta={{ title: `${BADGE} - ${TITLE}`, description: META_DESCRIPTION }}
    />
  );
}

const EmailsWelcome = () => {
  return (
    <>
      <SiteHeader />
      <main>
        <PageSection component="header">
          <PageSectionBreadcrumbs
            items={[{ label: BADGE, to: ".." }, { label: TITLE }]}
          />
          <PageSectionHeader title={DESCRIPTION} hLevel={1} />
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
