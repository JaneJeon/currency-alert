require("dotenv").config()

const request = require("request-promise-native")

exports.run = async () => {
  const html = await request(
    `https://www.google.com/search?q=${process.env.CUR_1}+to+${
      process.env.CUR_2
    }`
  )

  // voodoo regex magic to extract exchange rate
  const rate = html.match(/<div class="J7UKTe">[^=]+= (\S+)/)[1]

  if (rate <= process.env.XCHANGE_RATE_LIMIT) {
    const msg = `${process.env.CUR_1} to ${
      process.env.CUR_2
    } rate is now ${rate}`
    console.log(msg)

    const SES = require("aws-sdk/clients/ses"),
      ses = new SES()

    ses.sendEmail({
      Source: process.env.EMAIL_FROM,
      Destination: { ToAddresses: [process.env.EMAIL_TO] },
      Message: {
        Subject: {
          Data: "Exchange Rate Monitor Notification"
        },
        Body: {
          Text: {
            Data: `${msg}.\nPlease delete the function with [[sls remove]].`
          }
        }
      }
    })
  }
}
