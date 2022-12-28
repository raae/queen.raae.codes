import React from "react";

import PageHead from "../../components/page-head";
import SiteHeader from "../../components/site-header";
import PageSection, {
  PageSectionBreadcrumbs,
  PageSectionHeader,
} from "../../components/page-section";

const BADGE = "Emails";
const TITLE = "Preferences";
const DESCRIPTION = "Your preferences have been saved 📩";

export function Head(props) {
  return (
    <PageHead
      {...props}
      meta={{ title: `${BADGE} - ${TITLE}`, description: DESCRIPTION }}
    />
  );
}

export default function EmailsPreferences() {
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
      </main>
    </>
  );
}
