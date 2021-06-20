import React, { Fragment } from "react"
import { Heading, Box, Text, Link, Divider } from "theme-ui"

import SvgSummerFunctionsHero from "../components/summer-functions-hero"
import SiteSection from "../components/site-section"
import NewsletterForm from "../components/newsletter-form"
import DescriptionList from "../components/description-list"

import HourGlass from "../../static/images/hourglass_bottom_black_24dp.inline.svg"
import Live from "../../static/images/live_tv_black_24dp.inline.svg"
import Group from "../../static/images/groups_black_24dp.inline.svg"
import Inbox from "../../static/images/move_to_inbox_black_24dp.inline.svg"
import Repeat from "../../static/images/replay_5_black_24dp.inline.svg"

import One from "../../static/images/looks_1_black_24dp.inline.svg"
import Two from "../../static/images/looks_2_black_24dp.inline.svg"
import Three from "../../static/images/looks_3_black_24dp.inline.svg"
import Four from "../../static/images/looks_4_black_24dp.inline.svg"
import Five from "../../static/images/looks_5_black_24dp.inline.svg"

const IndexPage = () => {
  return (
    <Fragment>
      <SvgSummerFunctionsHero />
      <SiteSection
        heading="Stay in the loop"
        body={
          <Fragment>
            To get notified about{" "}
            <Text sx={{ fontWeight: "bold" }}>pricing</Text> and availability,
            sign up for Queen Raae's Gatsby Newsletter.
          </Fragment>
        }
      >
        <NewsletterForm cta="Add me on the list!" />
      </SiteSection>

      <SiteSection
        backgroundColor="shades.section"
        showDots={true}
        heading="Clear as mud"
        subHeading="Tried and failed with serverless/lambda/aws before?"
        body="Newly released Gatsby Functions radically simplifies how to write and deploy serverless functions. By adding features to your own existing Gatsby site you'll have home turf advantage, and we're here to make sure you get all the way to deploy this time"
      />
      <SiteSection
        heading="Beyond the basics"
        subHeading={
          <Fragment>
            Done the{" "}
            <Box
              as="code"
              variant="styles.code"
            >{`res.send({hello: "world"})`}</Box>
            example, now what?
          </Fragment>
        }
        body="Not sure what to use Gatsby Functions for? Or how to make them
        production ready? Get practical real world experience by completing
        our weekly challenges. We'll also throw in some whimsy, because why
        not have some fun while you are at it"
      />

      <SiteSection
        backgroundColor="shades.section"
        showDots={true}
        heading="Five weeks, Five Challenges"
        subHeading="You'll have access to the material forever. "
        body="Take a week off if something better comes up, like a trip on a pirate ship"
      >
        <Divider />
        <Heading as="h4" variant="heading.h4">
          The Challenges
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          ultricies a nunc ac vulputate
        </Text>
        <Divider />
        <Box as="dl">
          <DescriptionList
            icon={<One />}
            title="Week 1"
            description={<Fragment>TBC</Fragment>}
          />
          <DescriptionList
            icon={<Two />}
            title="Week 2"
            description={<Fragment>TBC</Fragment>}
          />
          <DescriptionList
            icon={<Three />}
            title="Week 3"
            description={<Fragment>TBC</Fragment>}
          />
          <DescriptionList
            icon={<Four />}
            title="Week 4"
            description={<Fragment>TBC</Fragment>}
          />
          <DescriptionList
            icon={<Five />}
            title="Week 5"
            description={<Fragment>TBC</Fragment>}
          />
        </Box>

        <Divider />
        <Heading as="h4" variant="heading.h4">
          The Weekly Schedule
        </Heading>
        <Text>
          Gatsby Summer Functions will run from{" "}
          <Text sx={{ fontWeight: "bold" }}>Saturday July 10th</Text> to{" "}
          <Text sx={{ fontWeight: "bold" }}>Friday August 13th</Text>
        </Text>
        <Divider />
        <Box as="dl">
          <DescriptionList
            icon={<HourGlass />}
            title="Saturday"
            description={
              <Fragment>
                Eagerly await{" "}
                <Text sx={{ color: "secondary" }}>the challenge</Text>. Start
                hacking right away, or wait until Monday
              </Fragment>
            }
          />
          <DescriptionList
            icon={<Live />}
            title="Tuesday"
            description={
              <Fragment>
                Join the <Text sx={{ color: "secondary" }}>live webinar</Text>{" "}
                where we'll code through a possible solution to the challenge,
                and you'll be able to ask us questions
              </Fragment>
            }
          />
          <DescriptionList
            icon={<Group />}
            title="Wednesday"
            description={
              <Fragment>
                Stuck? Bring your code and/or questions to the the{" "}
                <Text sx={{ color: "secondary" }}>workshop</Text>, and we'll
                help you through it in a small group setting.
              </Fragment>
            }
          />
          <DescriptionList
            icon={<Inbox />}
            title="Friday"
            description={
              <Fragment>
                Refresh your inbox until the{" "}
                <Text sx={{ color: "secondary" }}>challenge wrap-up</Text> comes
                through including a possible solution to the challenge you may
                copy/paste
              </Fragment>
            }
          />
          <DescriptionList
            icon={<Repeat />}
            title="Repeat"
            description={
              <Fragment>
                We’ll rinse and repeat this cycle for{" "}
                <Text sx={{ color: "secondary" }}>5 weeks</Text>
              </Fragment>
            }
          />
        </Box>
      </SiteSection>

      <SiteSection
        heading="Join the fun"
        subHeading=" We are super exited to see what you come up with!"
        body={
          <Fragment>
            Make sure to share your work on Twitter{" "}
            <Link
              href="https://twitter.com/search?q=%23GatsbySvgSummerFunctions&src=typed_query"
              target="_blank"
              rel="noopener"
            >
              #GatsbySummerFunctions
            </Link>
          </Fragment>
        }
      >
        <NewsletterForm cta="Tell me more" />
      </SiteSection>

      <SiteSection
        backgroundColor="shades.section"
        showDots={true}
        heading="Questions"
        subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies a nunc ac vulputate"
        body={
          <Fragment>
            Send an email to{" "}
            <Link href="mailto:queen@raae.codes">queen@raae.codes</Link>
          </Fragment>
        }
      />
    </Fragment>
  )
}

export default IndexPage
