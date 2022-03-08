import { Link } from "gatsby";
import React from "react";
import { IconList, IconListItem } from "./icon-list";
import Prose from "./prose";
import { DateText } from "./text";

import { Cta } from "../content/cta";

const Join = ({ start, end, paymentLink, price, status, deadline }) => {
  return (
    <>
      {status === "closed" ? (
        <IconList>
          <IconListItem icon="alarm">
            Registration closed, sign up for <Link to="/emails/">emails</Link>{" "}
            to be notified of the next chance!
          </IconListItem>
        </IconList>
      ) : (
        <>
          <IconList>
            {start && end && (
              <IconListItem icon="calendar">
                <DateText dateString={start} skipYear /> -{" "}
                <DateText dateString={end} skipYear />
              </IconListItem>
            )}
            {start && (
              <IconListItem icon="alarm">
                Registration closes{" "}
                <DateText dateString={start} addDays={deadline} skipYear />
              </IconListItem>
            )}
            {price && <IconListItem icon="price">{price}</IconListItem>}
          </IconList>

          <Cta
            label="Save your spot"
            note="or send queen@raae.codes any questions you might have"
            path={paymentLink}
            sx={{ my: "2em" }}
          />

          <Prose>
            <details>
              <summary>Choose your own Purchasing Parity Discount</summary>
              <p>
                You may apply any of these coupon codes depending on your
                situation.
              </p>
              <ul>
                <li>PPD30 gives you 30% off the price</li>
                <li>PPD60 gives you 60% off the price</li>
                <li>PPD85 gives you 85% off the price</li>
              </ul>
              <p>
                This came about after comparing developer salaries across the
                world. Salaries in Pakistan, Nigeria, Rwanda etc. are approx 85%
                less than the US and Northern Europe. Salaries in Spain, Italy,
                Portugal etc are about 60% less.{" "}
              </p>
              <p>
                Another reason for choosing a coupon might be that you are
                transitioning into tech, or some other valid reason. I trust
                you!
              </p>
            </details>
          </Prose>
        </>
      )}
    </>
  );
};

export default Join;
