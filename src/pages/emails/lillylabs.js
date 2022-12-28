import React from "react";

import PageHead from "../../components/page-head";
import SiteHeader from "../../components/site-header";
import PageSection, { PageSectionHeader } from "../../components/page-section";
import { Newsletter } from "../../components/newsletter";

const BADGE = "Newsletter";
const TITLE = "News about side projects and other shenanigans";
const DESCRIPTION =
  "Not interested in Gatsby specifically — but want to keep an eye on us, nonetheless?";

export function Head(props) {
  return (
    <PageHead
      {...props}
      meta={{ title: `${TITLE}`, description: DESCRIPTION }}
    />
  );
}

export default function LillyLabsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageSection component="header">
          <PageSectionHeader badge={BADGE} title={TITLE} hLevel={1} />
          <Newsletter
            mt="2em"
            cta="Yes, please!"
            formKey="lillylabs"
            message={DESCRIPTION}
          />
        </PageSection>
      </main>
    </>
  );
}
