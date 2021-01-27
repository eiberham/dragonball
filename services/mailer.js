const AWS = require("aws-sdk");

const config = require("../config");

AWS.config.update({
    accessKeyId: config.aws.key,
    secretAccessKey: config.aws.secret,
    region: config.aws.ses.region
});

/**
 *
 */
class Mailer {
    constructor() {}

    sendEmail(from, to, subject, text) {
        const params = {
            Destination: {
                /* required */
                CcAddresses: [],
                ToAddresses: [...to]
            },
            Message: {
                /* required */
                Body: {
                    /* required */
                    Html: {
                        Charset: "UTF-8",
                        Data: text
                    }
                    /* Text: {
                 Charset: "UTF-8",
                 Data: text
                } */
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: subject
                }
            },
            Source: from /* required */,
            ReplyToAddresses: [from]
        };

        const ses = new AWS.SES({ apiVersion: "2010-12-01" })
            .sendEmail(params)
            .promise();

        ses.then(function(data) {
            console.log(data.MessageId);
        }).catch(function(err) {
            console.error(err, err.stack);
        });
    }
}

module.exports = Mailer;
