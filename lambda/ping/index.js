const ping = require("./ping.js");

const headers = {
  "Access-Control-Allow-Origin": "http://localhost:8080", // Update as needed
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST",
  "Content-Type": "application/json",
};

exports.handler = async (event) => {
  try {
    const data = await ping.handler(event);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.log("Error in ping lambda:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal error" }),
    };
  }
};
