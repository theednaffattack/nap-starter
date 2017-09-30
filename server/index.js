// const bluebird = require("bluebird");
require("./debug");
const config = require("./config");

// // NOTE: event name is camelCase as per node convention
// process.on("unhandledRejection", function(reason, promise) {
//   // See Promise.onPossiblyUnhandledRejection for parameter documentation
// });

// // NOTE: event name is camelCase as per node convention
// process.on("rejectionHandled", function(promise) {
//   // See Promise.onUnhandledRejectionHandled for parameter documentation
// });

// From: https://stackoverflow.com/questions/43834559/how-to-find-which-promises-is-unhandled-in-nodejs-unhandledpromiserejectionwarni
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

const start = async () => {
  // NAP
  global.NAP = {};

  // Next and else
  const nextjs = await require("./initNext")(config);
  const initializer = require("./initializer");
  await initializer(config, nextjs);

  // Ready
  console.info(
    `NAP is ready to use (${process.env.NODE_ENV}), enjoy! [^._.^]ﾉ彡`
  ); // eslint-disable-line
};

module.exports = {
  start
};
