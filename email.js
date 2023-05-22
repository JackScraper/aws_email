import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'g' });

export const handler = async (event) => {

    // Hardcoded variables
    const emailBody = 'bla-bla-bla' // Email message
    const receiverEmail = 'hardwoodstefan@gmail.com'; // Receiver EMAIL
    const emailTitle = `TEST EMAIL`; // Email title

    const params = {
        Destination: {
            ToAddresses: [receiverEmail]
        },
        Message: {
            Body: {
                Text: {
                    Data: emailBody
                }
            },
            Subject: {
                Data: emailTitle
            }
        },
        Source: 'ivankrylov322@gmail.com' // email from which messages will be sent
    };

    try {
        await ses.sendEmail(params).promise();

        console.log('Message sent successfully');

        return {
            statusCode: 200,
            body: 'Message sent successfully',
        };
    } catch (error) {
        console.error('Error sending message:', error);

        return {
            statusCode: 500,
            body: 'Error sending message',
        };
    }
};
