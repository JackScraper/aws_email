import {handler} from "../index.js";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

jest.mock("@aws-sdk/client-ses");

describe('Email send tests', () => {

    it("should create an SES client with the correct region", async () => {
        const mockSendEmailCommand = jest.fn();
        SESClient.mockImplementation(() => ({
            send: mockSendEmailCommand
        }));

        const event = {
            user: {
                email: "receiver@example.com",
                name: "John",
                body: "Hello, world!"
            }
        };

        await handler(event);

        expect(SESClient).toHaveBeenCalledWith({ region: "us-east-1" });
    });

});
