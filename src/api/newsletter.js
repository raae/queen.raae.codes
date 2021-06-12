const axios = require("axios");

const addSubscriber = async ({ email, apiKey, formId }) => {
  const endpoint = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;
  return await axios.post(endpoint, {
    api_key: apiKey,
    email: email,
  });
};

export default async function handler(req, res) {
  try {
    await addSubscriber({
      email: req.body.email,
      formId: process.env.CK_FORM_ID,
      apiKey: process.env.CK_API_KEY,
    });

    res.status(200).json({ message: "Subscriber added to form" });
  } catch (error) {
    if (error.response) {
      // Error from add subscriber request
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}
