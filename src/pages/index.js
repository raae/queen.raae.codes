import React, { Fragment } from "react"

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
import Weeks from "../components/weeks"
import PricingTable from "../components/pricing-table"

const IndexPage = () => {
  return (
    <Fragment>
      <SvgSummerFunctionsHero />
      <SiteSection textAlign="center">
        <p className="intro">
          Join the <em>fun</em> this summer and learn Gatsby Functions by adding
          at least three <em>serverless</em> features to your existing Gatsby
          site&nbsp;&nbsp;
          <span role="img" aria-label="Party popper emojis">
            🎉🎉🎉
          </span>
        </p>
        <SvgFlowers mt="5" mb="4" mx="auto" />
        {/* <h2>Stay in the loop</h2>
        <NewsletterForm cta="Add me on the list!" mb="4">
          <p>
            <small>
              To get notified about <strong>pricing</strong> and{" "}
              <strong>availability</strong>, sign up for Queen Raae's Gatsby
              Newsletter.
            </small>
          </p>
        </NewsletterForm> */}
      </SiteSection>

      <SiteSection backgroundColor="shades.section" showDots={true}>
        <h2>Tried and failed with serverless/lambda/aws before?</h2>
        <p>
          Newly released Gatsby Functions radically simplifies how to write and
          deploy serverless functions. By adding features to your own existing
          Gatsby site you'll have home turf advantage, and we're here to make
          sure you get all the way to deploy this time{" "}
          <span role="img" aria-label="Muscle emoji">
            💪
          </span>
        </p>

        <h2>
          Done the <code>{`res.send({hello: "world"})`}</code>
          example, now what?
        </h2>
        <p>
          Not sure what to use Gatsby Functions for? Or how to make them
          production ready? Get practical real world experience by completing
          our weekly challenges. We'll also throw in some whimsy, because why
          not have some fun while you are at it{" "}
          <span role="img" aria-label="Muscle emoji">
            🤪
          </span>
        </p>
      </SiteSection>

      <SiteSection>
        <h2>Five weeks, Five Challenges</h2>
        <p className="intro">
          Learn Gatsby Functions by completing at least three out of our five
          challenges this summer. If you get stuck we are here to help with{" "}
          <em>live webinars</em> on Tuesdays and <em>open office hours</em> on
          Wednesdays.
        </p>
        <dl>
          <dt>When?</dt>
          <dd>
            <strong>Saturday July 17th</strong> to{" "}
            <strong>Friday August 27th</strong> with a week's break between the
            third and fourth challenge to let you relax, or catch up, before the
            final stretch.
          </dd>
        </dl>

        <h3>The Weekly Schedule</h3>

        <dl>
          <dt>
            <HourGlass /> Saturday
          </dt>
          <dd>
            <p>
              Eagerly await <strong>the challenge</strong>. Start hacking right
              away, or wait until Monday.
            </p>
          </dd>

          <dt>
            <Live /> Tuesday
          </dt>
          <dd>
            <p>
              Join the <em>live webinar</em> where the Queen will code through a
              possible solution to the challenge.
            </p>
          </dd>

          <dt>
            <Group /> Wednesday
          </dt>
          <dd>
            <p>
              <strong>Stuck?</strong> Bring your code and/or questions to{" "}
              <em>open office hours</em>, and we'll help you through it in a
              small group setting.
            </p>
          </dd>

          <dt>
            <Live /> Friday
          </dt>
          <dd>
            <p>
              We'll wrap up the challenge Nattermob style with a piratical{" "}
              <strong>live stream</strong> on YouTube 🏴‍☠️
            </p>
          </dd>

          <small>
            <span role="img" aria-label="Recycle emoji">
              ♻️
            </span>{" "}
            Rinse and repeat for 5 weeks
          </small>
        </dl>

        <SvgLollipop mt="5" mb="4" />

        <h3>The Challenges</h3>

        <Weeks
          items={[
            {
              number: "1",
              challenge: "Collect email addresses (and more) from visitors",
              topic: "Form submission through a Gatsby Function",
              description:
                "It could be an RSVP on an event page, application submission, newsletter sign up or something else your site needs.",
            },
            {
              number: "2",
              challenge:
                "Gather reactions (claps, hearts, unicorns) from visitors",
              topic: "Securing your public Gatsby Function",
              description:
                "Add Medium-style clapping, Dev.to-style unicorns or your favorite emoji reactions to your site.",
            },
            {
              number: "3",
              challenge: "Old school Guestbook, but with edit functionality",
              topic: "Local storage token authentication with Gatsby Function",
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
              topic: "Polling and caching data with your Gatsby Function",
            },
            {
              number: "5",
              description: (
                <>
                  What would you like to see here?
                  <br /> Email the Queen at{" "}
                  <a href="mailto://queen@raae.codes">queen@raae.codes</a>
                </>
              ),
              topic: "To be decided",
            },
          ]}
        />
      </SiteSection>

      <SiteSection
        backgroundColor="shades.section"
        showDots={true}
        textAlign="center"
      >
        <SvgBeach mx="auto" />
        <h2>Join the fun</h2>
        <p>Select between one of our four plans.</p>
      </SiteSection>

      <SiteSection>
        <PricingTable />
      </SiteSection>

      <SiteSection textAlign="center" variant="wide">
        <SvgFlag mx="auto" />
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
