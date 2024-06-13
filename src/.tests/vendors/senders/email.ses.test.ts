import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import SenderSES from "../../../sonata/vendors/senders/email/sender.email.aws";

jest.mock("@aws-sdk/client-ses", () => {
  const SESClient = jest.fn();
  const SendEmailCommand = jest.fn();
  return { SESClient, SendEmailCommand };
});



let config = {      
      account : "publicKey",
      privateKey : "privateKey",
      region: "us-west-2",
}

describe("SenderSES", () => {
  const sender = new SenderSES(config);
  const to = "recipient@example.com";
  const subject = "Test Email";
  const body = "This is a test email.";

  it("should send an email successfully", async () => {
    const sendMock = jest.fn().mockResolvedValue({ MessageId: "mockMessageId" });
    SESClient.prototype.send = sendMock;

    await expect(sender.send(to, subject, body)).resolves.toBeUndefined();
  });

  it("should log an error if sending email fails", async () => {
    const sendMock = jest.fn().mockRejectedValue(new Error("InvalidClientTokenId"));
    SESClient.prototype.send = sendMock;

    await expect(sender.send(to, subject, body)).rejects.toThrow("InvalidClientTokenId");
  });
});
