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

import One from "../../static/images/looks_1_black_24dp.inline.svg"
import Two from "../../static/images/looks_2_black_24dp.inline.svg"
import Three from "../../static/images/looks_3_black_24dp.inline.svg"
import Four from "../../static/images/looks_4_black_24dp.inline.svg"
import Five from "../../static/images/looks_5_black_24dp.inline.svg"

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
        <h2>Stay in the loop</h2>
        <NewsletterForm cta="Add me on the list!" mb="4">
          <p>
            To get notified about <strong>pricing</strong> and{" "}
            <strong>availability</strong>, sign up for Queen Raae's Gatsby
            Newsletter.
          </p>
        </NewsletterForm>
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

        <hr />

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
            <strong>Saturday July 10th</strong> to{" "}
            <strong>Friday August 20th</strong> with a a week's break near the
            end to let you catch up before the final stretch.
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

        <dl>
          <dt>
            <One />
            Week 1
          </dt>
          <dd>
            <p>
              <strong>July 10th to July 16th</strong>
            </p>
            <p>Challenge to be decided</p>
          </dd>

          <dt>
            <Two />
            Week 2
          </dt>
          <dd>
            <p>
              <strong>July 17th to July 23rd</strong>
            </p>
            <p>Challenge to be decided</p>
          </dd>

          <dt>
            <Three />
            Week 3
          </dt>
          <dd>
            <p>
              <strong>July 24th to July 30th</strong>
            </p>
            <p>Challenge to be decided</p>
          </dd>

          <dt>
            <Four />
            Week 4
          </dt>
          <dd>
            <p>
              <strong>July 31st to August 6th</strong>
            </p>
            <p>Challenge to be decided</p>
          </dd>

          <dt>Break</dt>
          <dd>
            <p>
              <strong>August 7th to August 13th</strong>
            </p>
            <p>
              Spend this week catching up while the Queen spends the time on
              horse back in the Norwegian mountains.
            </p>
          </dd>

          <dt>
            <Five />
            Week 5: August 14th to August 20th
          </dt>
          <dd>
            <p>
              <strong>July 17th to July 23rd</strong>
            </p>
            <p>Challenge to be decided</p>
          </dd>
        </dl>
      </SiteSection>

      <SiteSection
        backgroundColor="shades.section"
        showDots={true}
        textAlign="center"
      >
        <SvgBeach mx="auto" />
        <h2>Join the fun</h2>
        <p className="intro">
          We are super exited to see how you solve the challenges!
        </p>
        <p>
          Make sure to share your work on Twitter with{" "}
          <a
            href="https://twitter.com/search?q=%23GatsbySvgSummerFunctions&src=typed_query"
            target="_blank"
            rel="noreferrer"
          >
            #GatsbySummerFunctions
          </a>
        </p>
        <NewsletterForm cta="Tell me more" mt="5">
          To get notified about pricing and availability, sign up for Queen
          Raae's Gatsby Newsletter.
        </NewsletterForm>
      </SiteSection>

      <SiteSection textAlign="center">
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
