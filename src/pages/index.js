import React, { Fragment } from "react"
import { Grid, Embed } from "theme-ui"

import SvgSummerFunctionsHero from "../components/summer-functions-hero"
import SiteSection from "../components/site-section"
import NewsletterForm from "../components/newsletter-form"

import SvgLollipop from "../components/svg-lollipop"
import SvgFlowers from "../components/svg-flowers"
import SvgBeach from "../components/svg-beach"
import SvgFlag from "../components/svg-flag"

import HourGlass from "../../static/images/hourglass_bottom_black_24dp.inline.svg"
import Live from "../../static/images/live_tv_black_24dp.inline.svg"
import Group from "../../static/images/groups_black_24dp.inline.svg"
import Chat from "../../static/images/question_answer_black_24dp.inline.svg"
import Weeks from "../components/weeks"
import PricingTable from "../components/pricing-table"
import Crew from "../components/crew"
import Webinar from "../components/webinar"

const IndexPage = () => {
  return (
    <Fragment>
      <SvgSummerFunctionsHero />
      <SiteSection textAlign="center" width="narrow">
        <p className="intro">
          Join the <em>fun</em> this summer and deploy at least three Gatsby{" "}
          <em>Serverless</em> Functions&nbsp;&nbsp;
          <span role="img" aria-label="Party popper emojis">
            🎉🎉🎉
          </span>
        </p>
        <SvgFlowers mt="5" mx="auto" />
      </SiteSection>

      <SiteSection
        backgroundColor="shades.section"
        showDots={true}
        width="narrow"
      >
        <h3>Tried and failed with serverless/lambda/aws before?</h3>
        <p>
          Newly released Gatsby Functions radically simplifies how to write and
          deploy serverless functions. We are here to make sure you get all the
          way to deploy this time with a forum, live webinars and more{" "}
          <span role="img" aria-label="Muscle emoji">
            💪
          </span>
        </p>

        <h3>
          Done the <code>{`res.send({hello: "world"})`}</code>
          example, now what?
        </h3>
        <p>
          Not sure what to use Gatsby Functions for? Or how to make them
          production ready? Get practical real world experience by completing
          our weekly challenges. We'll also throw in some whimsy, because why
          not have some fun while you are at it{" "}
          <span role="img" aria-label="Muscle emoji">
            🤪
          </span>
        </p>

        <h3>Want to integrate all the things?</h3>
        <p>
          By learning how to make serverless functions, you'll be able to
          integrate any service with an API to your site but also to each other{" "}
          <span role="img" aria-label="Exploding Head emoji">
            🤯
          </span>
        </p>
        <Embed
          mt="5"
          src="https://www.youtube.com/embed/FUyyGCDmMD4?start=16"
        />
      </SiteSection>

      <SiteSection width="narrow">
        <h2>Five weeks, Five Challenges</h2>
        <p className="intro">
          Learn Gatsby Functions by completing at least three of our five
          challenges this summer.
        </p>
        <p>
          If you get stuck we are here to help with <em>live webinars</em> on
          Tuesdays and group <em>code review</em> on Wednesdays.
        </p>
        <h3>Dates</h3>
        <p>
          Summer Functions runs from <strong>Saturday, July 17th</strong> to{" "}
          <strong>Friday, August 27th</strong>, with a week's break between the
          third and fourth challenges to let you relax or catch up before the
          final stretch.
        </p>

        <h3>The Challenges</h3>

        <p>
          You can add the Gatsby Serverless Functions to you existing Gatsby
          site&nbsp;(>=3.7), use our starter Gatsby site or create an API only
          Gatsby project to be consumed by your older Gatsby site or another
          site completely.
        </p>

        <p className="dense">
          <small>
            Email Queen Raae if you are wondering what option is best for you at{" "}
            <a href="mailto://">queen@raae.codes</a>
          </small>
        </p>

        <Weeks
          items={[
            {
              number: "1",
              challenge: "Collect email addresses (and more) from visitors",
              description:
                "It could be an RSVP on an event page, application submission, newsletter sign up or something else your site needs.",
              topic:
                "How to get data from your Gatsby site into Userlist, ConvertKit, GoogleSheet, Fauna, AirTable, or another service of your choice.",
            },
            {
              number: "2",
              challenge:
                "Gather reactions (claps, hearts, unicorns, votes) from visitors",
              description:
                "Add Medium-style clapping, Dev.to-style unicorns, your favorite emoji reactions or voting to your site using Fauna, or another service of your choice.",
              topic:
                "How to limit submissions and securing your function to minimize abuse and misuse.",
            },
            {
              number: "3",
              challenge: "Limit usage to visitors who have logged in",
              description:
                "Add authentication checks to either challenge 1 or 2. We'll add Auth0 to your site if you have no auth already.",
              topic:
                "How to handle authentication in your serverless function.",
            },
            {
              number: "Break",
              topic: "Relax or play catch up!",
            },
            {
              number: "4",
              challenge: "Display live data on your site",
              description:
                "Get the data from Twitter, GitHub, YouTube, Twitch, Instagram or wherever makes sense for you.",
              topic:
                "How to poll data in React and how to cache data for your site in a Gatsby Functions if there are limits on the API you use.",
            },
            {
              number: "5",
              challenge: "Get paid!",
              description:
                "Charge money through your site for something. Stay in Stripe test mode, or start thinking about something real to sell...",
              topic:
                "How to customize you payment flow and hook into the Stripe events with a custom webhook.",
            },
          ]}
        />
      </SiteSection>

      <SiteSection height="dense" textAlign="center">
        <SvgLollipop mx="auto" />
        <p className="intro">
          In addition to the weekly schedule, we'll sprinkle in some{" "}
          <em>Bonus Webinars</em> on topics related to Gatsby Functions and
          serverless with <em>guest instructors</em>.
        </p>
      </SiteSection>

      <SiteSection width="narrow">
        <h3>The Weekly Schedule</h3>

        <dl>
          <dt>
            <HourGlass /> Saturday
          </dt>
          <dd>
            <p>
              Eagerly await <strong>the challenge</strong> prompt. Start hacking
              right away, or wait until Monday.
            </p>
          </dd>

          <dt>
            <Live /> Tuesday @ <time>17:00 CEST</time>
          </dt>
          <dd>
            <p className="dense">
              <small>15:00 UTC / 8 AM PST</small>
            </p>
            <p>
              Join the <em>live webinar</em> (or watch the replay at your
              convenience) where Queen Raae codes through a possible solution to
              the challenge, and you may ask questions.
            </p>
          </dd>

          <dt>
            <Group /> Wednesday @ <time>17:00 CEST</time>
          </dt>
          <dd>
            <p className="dense">
              <small>15:00 UTC / 8 AM PST</small>
            </p>
            <p>
              Level up with group <em className="primary">code review</em>. Get
              help and feedback from us and the other sailors and sea dogs
              (max&nbsp;8) on your code.
            </p>
          </dd>

          <dt>
            <Live /> Friday @ <time>20:00 CEST</time>
          </dt>
          <dd>
            <p className="dense">
              <small>18:00 UTC / 11 AM PST</small>
            </p>
            <p>
              We'll wrap up the challenge Nattermob style with a piratical{" "}
              <strong>live stream</strong> on YouTube where Paul, the navigator,
              talks Queen Raae through a possible solution 🏴‍☠️
            </p>
          </dd>

          <dt>
            <Chat /> All week
          </dt>
          <dd>
            <p>
              The <em>forum</em> is open and we're there to help along with the
              other cats, sailors and sea dogs.
            </p>
          </dd>

          <small>
            <span role="img" aria-label="Recycle emoji">
              ♻️
            </span>{" "}
            Rinse and repeat for 5 weeks
          </small>
        </dl>
      </SiteSection>

      <PricingSection Icon={SvgBeach} />

      <SiteSection backgroundColor="shades.section" showDots={true}>
        <h2>The crew</h2>
        <Grid
          sx={{
            mt: 5,
            gap: 5,
          }}
        >
          <Crew
            color="tertiary"
            avatar="avatar-raae.jpg"
            intro="Queen Raae wrote her first JS in 2000"
            skill="Duck taping together services to create side projects"
            description="Raae started playing with Gatsby back in 2018. She is the woman behind the Gatsby app POW! — the privacy-first menstrual cycle journal and the creator of the Gatsby plugin: gatsby-remark-oembed. She also spoke at Gatsby Days 2020."
          />

          <Crew
            avatar="avatar-paul.jpg"
            intro="Pirate Paul is an absolute Gatsby fan-boy"
            skill="Once built a design system in 11 minutes"
            description="Paul's Gatsby adventure also began in 2018. Shortly after he released the
            Gatsby plugin: mdx-embed, and in 2020 he won Gatsby's Silly Site Challenge
            by creating a site exclusively about bums!"
          />

          <Crew
            avatar="avatar-ola.jpg"
            intro="Pirate Ola taught himself to code"
            skill="Creates piratical stories to explain Gatsby concepts"
            description="Gatsby met Ola's need for 'hands-on'-tinkering and practical, real-world usage when learning to code. He is the junior dev on POW! — the privacy-first menstrual cycle journal and is very much looking forward to teaching the Pirate Princess Lillian (6) to code."
          />
        </Grid>
        <hr />
        <h2>The bonus pirates</h2>
        <Grid
          sx={{
            mt: 5,
            gap: 5,
          }}
        >
          <Crew
            color="secondary"
            avatar="avatar-mike.jpg"
            intro="Securing your Gatsby Serverless Functions"
            description="Gatsby Staff Security Engineer, Mike Gualtieri will show us how to fix common security flaws he has seen in real life production code."
            crowdcast="https://www.crowdcast.io/e/securing-your-gatsby"
            date="Thu, Jul 29, 2021 20:00 CEST / 11:00 AM PST "
          />

          <Crew
            color="secondary"
            avatar="avatar-swizec.jpg"
            intro="Architecting your Gatsby Serverless Functions"
            description="Swizec Teller, author of the Serverless Handbook, shows us how to architect our serverless functions so we do not end up with a big old mess."
            crowdcast="https://www.crowdcast.io/e/architecturing-your"
            date="Mon, Aug 2, 2021 17:00 CEST / 08:00 AM PST (might change)"
          />

          <Crew
            color="secondary"
            avatar="avatar-unkown1.jpg"
            intro="Testing your Gatsby Serverless Functions"
            description="I am working on getting a special guest to show us how to test our Gatsby Functions."
            date="Date to TBD"
            photo={
              <span>
                Photo by{" "}
                <a href="https://unsplash.com/@emilymorter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                  Emily Morter
                </a>{" "}
                on{" "}
                <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                  Unsplash
                </a>
              </span>
            }
          />
        </Grid>
      </SiteSection>

      <SiteSection textAlign="center" width="narrow">
        <h2>What's included in the packages?</h2>
        <p className="intro">
          The Summer Functions <em>Command Central</em> is a private{" "}
          <em>GitHub repo</em> you'll get access to and keep access to until the
          end of the year.
        </p>

        <h3>Forum</h3>
        <p>
          The Discussions tab of the private GitHub repo will be our forum.
          There you you can ask questions, discuss possible solutions and get to
          know the other cats, sailors and sea dogs.
        </p>

        <h3>Challenges</h3>
        <p>
          Each Saturday you'll receive the challenge in your inbox. In addition
          you will be able to find it as a thread in the forum.
        </p>

        <h3>Live Webinars</h3>
        <p>
          Each Tuesday Queen Raae we'll walk you through a possible solution to
          the challenge as a live webinar where you can ask questions. The
          webinar recordings will be available to view, at your convenience,
          until the end of the year.
        </p>

        <h3>Code Samples</h3>
        <p>
          The live webinar code will be available as a Pull Request in the
          private GitHub repo. Feel free to comment and ask questions directly
          on the Pull Request.
        </p>

        <h3>Group Code Review</h3>
        <p>
          If you are a sailor or sea dog you are invited to join the group code
          review every Wednesday. There you will get feedback on your code from
          Queen Raae and others in the group of max 8 people.
        </p>

        <h3>One-on-One Pair Programming Sessions</h3>
        <p>
          Sea dogs get 3 pair programming sessions with Queen Raae at a
          convenient time for both. Each session is 40 minutes.
        </p>
      </SiteSection>

      <SiteSection textAlign="center" width="narrow">
        <h2>Community functions</h2>
        <p className="intro">
          In addition to the paid packages there are <em>bonus webinars</em> and{" "}
          <em>YouTube live streams</em> open to all!
        </p>

        <h3>YouTube live streams </h3>
        <p>
          Every week we close off the challenge with a Nattermob live streams
          where Pirate Paul navigates us through his solution to the challenge.
          And we show off what you have accomplished if you let use know.
        </p>

        <h3>Free Bonus Webinars</h3>
        <Webinar
          crowdcast="https://www.crowdcast.io/e/a-practical-introduction"
          title="A practical introduction to Gatsby Functions"
          cover="webinar-intro.png"
          date="Tue, Jul 13, 2021 17:00 CEST / 8:00 AM PST"
        />
        <Webinar
          crowdcast="https://www.crowdcast.io/e/securing-your-gatsby"
          title="Securing your Gatsby Functions with Gatsby Staff Security Engineer, Mike Gualtieri"
          cover="webinar-mike.png"
          date="Thu, Jul 29, 2021 20:00 CEST / 11:00 AM PST"
        />
        <Webinar
          crowdcast="https://www.crowdcast.io/e/architecturing-your"
          title="Architecting your Gatsby Serverless Functions with author of the Serverless Handbook, Swizec Teller"
          cover="webinar-swizec.png"
          date="Mon, Aug 2, 2021 17:00 CEST / 08:00 AM PST"
        />
      </SiteSection>

      <PricingSection />

      <SiteSection
        backgroundColor="shades.section"
        showDots={true}
        textAlign="center"
      >
        <SvgFlag mx="auto" />
        <h2>Rather be a Stowaway?</h2>
        <p className="intro">
          Would you like to keep the <em>summer open?</em> Only have time for{" "}
          <em>one challenge?</em> Not really into <em>group things?</em> Not
          ready to <em>commit yet?</em> Some other <em>reason</em> or{" "}
          <em>impediment?</em>
        </p>
        <p>
          Summer Functions is more than the paid packages. We'll stream live on
          YouTube every Friday, and sprinkled throughout, there are free bonus
          webinars.
        </p>
        <p className="dense">
          <small>
            Stay in the loop as a Stowaway by signing up for Queen Raae's
            Piratical Gatsby Newsletter!
          </small>
        </p>

        <hr />
        <NewsletterForm cta="Join Newsletter" />
      </SiteSection>
      <SiteSection textAlign="center">
        <h2>Questions?</h2>
        <p>
          Send an email to{" "}
          <a href="mailto:queen@raae.codes">queen@raae.codes</a>
        </p>
      </SiteSection>
    </Fragment>
  )
}

export default IndexPage

const PricingSection = () => {
  return (
    <Fragment>
      <SiteSection
        backgroundColor="shades.section"
        showDots={true}
        textAlign="center"
        width="narrow"
      >
        <SvgBeach mx="auto" />
        <h2>Join the fun</h2>
        <p>
          Make sure to jump onboard as soon as you can, <br />
          the paid packages all have limited seats!
        </p>
        <p className="dense">
          <small>
            Friday wrap-ups, and all the bonus streams, is viewable by anyone on
            YouTube. <br />
            No purchase necessary.
          </small>
        </p>
      </SiteSection>

      <SiteSection width="wide">
        <PricingTable
          productId={process.env.GATSBY_STRIPE_PRODUCT}
          plans={[
            {
              title: "Ship's cat",
              price: 250,
              stripeLinkId: process.env.GATSBY_STRIPE_LINK_LOW,
              stripePriceId: process.env.GATSBY_STRIPE_PRICE_LOW,
            },
            {
              title: "Sailor",
              price: 550,
              stripeLinkId: process.env.GATSBY_STRIPE_LINK_MEDIUM,
              stripePriceId: process.env.GATSBY_STRIPE_PRICE_MEDIUM,
            },
            {
              title: "Sea Dog",
              price: 1375,
              stripeLinkId: process.env.GATSBY_STRIPE_LINK_HIGH,
              stripePriceId: process.env.GATSBY_STRIPE_PRICE_HIGH,
            },
          ]}
          perks={[
            { item: "Access to the forum", plans: 0 },
            { item: "5 Challenges", plans: 0 },
            { item: "5 Code Samples", plans: 0 },
            { item: "5 Live Webinars", plans: 0 },
            { item: "5 Code Review Sessions", plans: 1 },
            { item: "3 One-on-One Pair Programming Sessions", plans: 2 },
          ]}
          outro={
            <>
              <p>
                <strong>100% Money-Back Guarantee</strong>
                <br /> If you are not satisfied with Summer Functions, let me
                know and I’ll give you a full refund.
              </p>
              <p className="dense">
                <small>
                  <strong>Need a discount?</strong>
                  <br /> If for some reason these prices are outrageous for you
                  (between jobs, transitioning into tech etc. etc.) email{" "}
                  <a href="mailto:queen+mercy@raae.codes">
                    queen+mercy@raae.codes
                  </a>
                  .
                </small>
              </p>
            </>
          }
        />
      </SiteSection>
    </Fragment>
  )
}
