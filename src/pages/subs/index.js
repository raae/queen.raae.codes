import React from "react";

import PageHead from "../../components/page-head";
import SiteHeader from "../../components/site-header";
import PageSection, { PageSectionHeader } from "../../components/page-section";
import { Newsletter } from "../../components/newsletter";

const BADGE = "Ship's log";
const TITLE = "Join the crew!";
const DESCRIPTION =
  "Stay up to date on all things Queen Raae & Family as a Ship's Log subscriber.";

export function Head(props) {
  return (
    <PageHead
      {...props}
      meta={{ title: `${BADGE} - ${TITLE}`, description: DESCRIPTION }}
    />
  );
}

export default function PostsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageSection component="header">
          <PageSectionHeader
            badge={BADGE}
            title={TITLE}
            lead={DESCRIPTION}
            hLevel={1}
          />
          <Newsletter mt="2em" cta="Yes, please!" message="" tagline="" />
        </PageSection>
      </main>
    </>
  );
}
