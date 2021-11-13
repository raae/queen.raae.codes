import { Link } from "gatsby";
import React from "react";
import { IconList, IconListItem } from "../components/icon-list";
import { DateText } from "../components/text";

const BootcampBuy = ({
  title,
  outcome,
  start,
  end,
  payment_link,
  price,
  deadline,
}) => {
  return (
    <section>
      <h2 id="join">{title}</h2>
      <p>{outcome}</p>
      <IconList>
        {/* {start && end && (
          <IconListItem icon="calendar">
            <DateText dateString={start} skipYear /> -{" "}
            <DateText dateString={end} skipYear />
          </IconListItem>
        )} */}
        {/* {start && (
          <IconListItem icon="alarm">
            Registration closes{" "}
            <DateText dateString={start} addDays={deadline} skipYear />
          </IconListItem>
        )} */}
        <IconListItem icon="alarm">
          Registration closed, sign up for <Link to="/emails/">emails</Link> to
          be notified of the next chance!
        </IconListItem>
        {/* {price && <IconListItem icon="price">{price}</IconListItem>} */}
      </IconList>

      <details>
        <summary>Choose your own Purchasing Parity Discount</summary>
        <p>
          You may apply any of these coupon codes depending on your situation.
        </p>
        <ul>
          <li>PPD30 gives you 30% off the price</li>
          <li>PPD60 gives you 60% off the price</li>
          <li>PPD85 gives you 85% off the price</li>
        </ul>
        <p>
          This came about after comparing developer salaries across the world.
          Salaries in Pakistan, Nigeria, Rwanda etc. are approx 85% less than
          the US and Northern Europe. Salaries in Spain, Italy, Portugal etc are
          about 60% less.{" "}
        </p>
        <p>
          Another reason for choosing a coupon might be that you are
          transitioning into tech, or some other valid reason. I trust you!
        </p>
      </details>

      {/* <h4>
        <a href={payment_link}>Save your spot</a>
      </h4> */}
    </section>
  );
};

export default BootcampBuy;
