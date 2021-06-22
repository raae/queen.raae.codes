import React, { Fragment } from "react"

import One from "../../static/images/looks_1_black_24dp.inline.svg"
import Two from "../../static/images/looks_2_black_24dp.inline.svg"
import Three from "../../static/images/looks_3_black_24dp.inline.svg"
import Four from "../../static/images/looks_4_black_24dp.inline.svg"
import Five from "../../static/images/looks_5_black_24dp.inline.svg"

const Icon = ({ number }) => {
  switch (number) {
    case "1":
      return <One />
    case "2":
      return <Two />
    case "3":
      return <Three />
    case "4":
      return <Four />
    case "5":
      return <Five />

    default:
      return null
  }
}

const Week = ({ number, title, challenge, topic, description }) => {
  return (
    <Fragment>
      <dt>
        <Icon number={number} />
        <span>{title || `Week ${number}`}</span>
      </dt>
      <dd>
        <h4>{challenge}</h4>
        <p>{description}</p>
        <p>
          <small>
            <em>Topic:</em> {topic}
          </small>
        </p>
      </dd>
    </Fragment>
  )
}

const Weeks = ({ items }) => {
  return (
    <dl>
      {items.map((item) => (
        <Week {...item} />
      ))}
    </dl>
  )
}

export default Weeks
