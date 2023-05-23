import AWS from 'aws-sdk';
import fs from 'fs';

const ses = new AWS.SES({ region: 'us-east-1' });

export const handler = async (event) => {

    const emailBody = fs.readFileSync('message/index.html', 'utf-8')
    const userName = event.user.name;
    const userEmail = event.user.email;
    const customizedHtmlBody = emailBody.replace('{{userName}}', userName).replace('{{userEmail}}', userEmail);

    const msgTitle = `Hi ${event.user.name}!`;

    // Print the segment data to the console
    console.log('name', event.user.name);
    console.log('email', event.user.email);

    const email = event.user.email; // Who needs to send

    const params = {
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: customizedHtmlBody // Use the HTML template content
                }
            },
            Subject: {
                Data: msgTitle, // Msg title
            },
        },
        Source: 'ivankrylov322@gmail.com', // Sender Email
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
