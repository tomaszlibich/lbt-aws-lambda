exports.handler = async () => {
  return {
    key: process.env.PING_KEY,
    message: "ping successful",
  };
};
