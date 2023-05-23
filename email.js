import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: "us-east-1" });

export const handler = async (event) => {

    // Hardcoded variables
    const receiverEmail = event.user.email; // Receiver EMAIL
    const emailTitle = `Hi ${event.user.name}!`; // Email title
    const params = {
        Destination: {
            ToAddresses: [receiverEmail]
        },
        Message: {
            Body: {
                Text: {
                    Data: event.user.body // email message
                }
            },
            Subject: {
                Data: emailTitle
            }
        },
        Source: 'ivankrylov322@gmail.com' // email from which messages will be sent
    };

    try {
        const command = new SendEmailCommand(params);
        const response = await sesClient.send(command);
        console.log("Email sent:", response.MessageId);
        return `Email sent: ${response.MessageId}`
    } catch (error) {
        console.error("Error sending email:", error);
        return `Error: ${error}`
    }
};
