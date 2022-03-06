import React from "react";

import Seo from "../../components/seo";
import SiteHeader from "../../components/site-header";
import PageSection, {
  PageSectionBreadcrumbs,
  PageSectionHeader,
} from "../../components/page-section";

const EmailsPreferences = (props) => {
  const badge = "Daily emails";
  const title = "Preferences";
  const description = " Your preferences have been saved 📩";
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
      </main>
    </>
  );
};

export default EmailsPreferences;
