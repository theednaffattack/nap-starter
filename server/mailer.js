const { guard } = require("./errors");

const willSendVerification = async ({
  postmark_server_api_key,
  postmark_domain,
  email,
  verification_url
}) => {
  var postmark = require("postmark");
  var postmarkClient = new postmark.Client(postmark_server_api_key);
  guard(
    { postmark_server_api_key },
    "Required : postmark_server_api_key, Missing .env POSTMARK_SERVER_API_KEY?"
  );
  guard(
    { postmark_domain },
    "Required : postmark_domain, Missing .env POSTMARK_DOMAIN?"
  );
  guard({ email });
  guard({ verification_url });

  const emailOptions = {
    From: `eddie@${postmark_domain}`,
    To: email,
    Subject: "Test",
    TextBody: "Test Message" + verification_url
  };

  // postmarkClient.sendEmail({
  //   From: `eddie@${postmark_domain}`,
  //   To: email,
  //   Subject: "Test",
  //   TextBody: "Test Message"
  // });

  var messages = [
    {
      From: `eddie@${postmark_domain}`,
      To: email,
      Subject: "Message #1",
      TextBody: "This is email number 1." + verification_url
    },
    {
      From: `eddie@${postmark_domain}`,
      To: email,
      Subject: "Message #2",
      TextBody: "This is email number 2." + verification_url
    }
  ];

  // Send
  try {
    return await postmarkClient.sendEmailBatch(messages);
    // return await postmarkClient.sendEmail(emailOptions);
  } catch (error) {
    console.error(
      `Unable to send via postmark: ${postmark_server_api_key} \n ${error.message}.`
    );
    return;
  }

  // // Send
  // return await postmarkClient.messages.create(postmark_domain, data);
};

const willSendPasswordReset = async ({
  postmark_server_api_key,
  postmark_domain,
  email,
  verification_url
}) => {
  var postmark = require("postmark");
  var postmarkClient = new postmark.Client(postmark_server_api_key);

  guard(
    { postmark_server_api_key },
    "Required : postmark_server_api_key, Missing .env POSTMARK_SERVER_API_KEY?"
  );
  guard(
    { postmark_domain },
    "Required : postmark_domain, Missing .env POSTMARK_DOMAIN?"
  );
  guard({ email });
  guard({ verification_url });

  // Send
  postmarkClient.sendEmail({
    From: "donotreply@example.com",
    To: email,
    Subject: "Test",
    TextBody: "Test Message"
  });
  // try {
  //   return await postmarkClient.messages.create(postmark_domain, data);
  // } catch (error) {
  //   console.log(error);
  // }
};
module.exports = { willSendVerification, willSendPasswordReset };
