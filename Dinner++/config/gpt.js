const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()

// Set up the OpenAI API credentials
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
// const apiEndpoint = 'https://api.openai.com';

// Create an instance of the OpenAI API client
// const client = new openai(apiKey, { apiKey: apiEndpoint });




module.exports = openai;