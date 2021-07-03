const axios = require("axios")

const addSubscriber = async ({ email, apiKey, formId }) => {
  const endpoint = `https://api.convertkit.com/v3/forms/${formId}/subscribe`
  return await axios.post(endpoint, {
    api_key: apiKey,
    email: email,
  })
}

export default async function handler(request, response) {
  const { email } = request.body

  if (!email) {
    response.status(400).send(`An email address is required`)
  } else {
    try {
      await addSubscriber({
        email,
        formId: process.env.CK_FORM_ID,
        apiKey: process.env.CK_API_KEY,
      })

      response.status(200).json({ message: "Subscriber added to form" })
    } catch (error) {
      if (error.response) {
        // Error from add subscriber request
        response.status(error.response.status).json(error.response.data)
      } else {
        response.status(500).json({ message: error.message })
      }
    }
  }
}
