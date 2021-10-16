import axios from "axios";

const TAGS = {
  // "TOPIC:SERVERLESS": "",
  // "TOPIC:GATSBY": "",
  // "TOPIC:NETLIFY": "",
  // "TOPIC:GATSBYCLOUD": "",
  // "TOPIC:POW": "",
  // "TOPIC:CONVERTKIT": "",
  // "TOPIC:USERLIST": "",
  // "TOPIC:SSR": "",
  // "TOPIC:SSG": "",
  // "TOPIC:CSR": "",
};

const FORM_ID = {
  QUEEN: "2454187",
  TIMESHIP: "2604593",
  VERSION4: "2608546",
};

export const addSubscriber = async ({ formKey, email, tags }) => {
  const formId = FORM_ID[`${formKey.toUpperCase()}`];
  if (!formId) {
    throw new Error("Not a valid form key");
  }

  const endpoint = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;
  const tagIds = tags.map((tag) => {
    return TAGS[`${tag.toUpperCase()}`];
  });

  const result = await axios.post(endpoint, {
    api_key: process.env.GATSBY_CK_API_KEY,
    email: email,
    tags: tagIds,
  });

  if (window?.fathom) {
    const eventId = "LPC2JAXX";
    window.fathom.trackGoal(eventId, 0);
    console.log("Track event: ", eventId);
  }

  return result;
};
