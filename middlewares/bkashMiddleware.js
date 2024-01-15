const asyncHandler = require("express-async-handler");
const axios = require("axios");
const globals = require("node-global-storage");

const bkashAuth = asyncHandler(async (req, res, next) => {
  globals.unset("id_token");

  try {
    const { data } = await axios.post(
      process.env.bkash_grant_token_url,
      {
        app_key: process.env.BKASH_APP_KEY,
        app_secret: process.env.BKASH_APP_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: process.env.BKASH_USERNAME,
          password: process.env.BKASH_PASSWORD,
        },
      }
    );

    // console.log(data);
    globals.set("id_token", data.id_token, { protected: true });

    next();
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { bkashAuth };
