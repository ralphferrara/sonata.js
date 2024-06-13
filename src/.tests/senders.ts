      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Senders
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import fs                                       from 'fs';
      import { SenderConfigSMS, SenderConfigEmail }   from '../sonata/vendors/.interfaces'; // Assuming this is the correct path to your interface definitions
      import SenderTwilio                             from '../sonata/vendors/senders/sms/sender.sms.twilio.js'; // Import the sender implementations
      import SenderSNS                                from '../sonata/vendors/senders/sms/sender.sms.aws.js';
      import SenderGoogleSMS                          from '../sonata/vendors/senders/sms/sender.sms.google.js';
      import SenderSendGrid                           from '../sonata/vendors/senders/email/sender.email.sendgrid.js';
      import SenderGoogleEmail                        from '../sonata/vendors/senders/email/sender.email.google.js';
      import SenderSES                                from '../sonata/vendors/senders/email/sender.email.aws.js';

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| readJSONFile
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      function readJSONFile(path: string): any {
            console.log("READING FILE", path);
            const data = fs.readFileSync(path, 'utf8');
            console.log(data);
            return JSON.parse(data);
      }
      
      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Senders
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      async function senders(): Promise<void> {
            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Senders JSON
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
            const smsConfig         : Record<string, SenderConfigSMS>   = readJSONFile('config/senders.sms.json');
            const emailConfig       : Record<string, SenderConfigEmail> = readJSONFile('config/senders.email.json');
            console.log("SMS CONFIG",           smsConfig);
            console.log("EMAIL CONFIG",         emailConfig);
            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| SMS
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
            for (const sender in smsConfig) {
                  console.log("|----------------------------------------------------------------");
                  console.log("| SMS SENDER: ", sender);
                  console.log("|----------------------------------------------------------------");
                  const senderConfig = smsConfig[sender];
                  switch (senderConfig.service) {
                        case "twilio" : new SenderTwilio(senderConfig);             break;
                        case "SNS"    : new SenderSNS(senderConfig);                break;
                        case "google" : new SenderGoogleSMS(senderConfig);          break;
                        default       : console.warn("Invalid SMS sender service:", senderConfig.service);
                  }
            }
            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Email
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
            for (const sender in emailConfig) {
                  console.log("|----------------------------------------------------------------");
                  console.log("| EMAIL SENDER: ", sender);
                  console.log("|----------------------------------------------------------------");
                  const senderConfig = emailConfig[sender];
                  switch (senderConfig.service) {
                        case "sendgrid": new SenderSendGrid(senderConfig);          break;
                        case "google"  : new SenderGoogleEmail(senderConfig);       break;
                        case "SES"     : new SenderSES(senderConfig); break;
                        default        : console.warn("Invalid Email sender service:", senderConfig.service);
                  }
            }
            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Complete
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
            console.log("Senders setup completed.");
      }

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Senders
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      senders().catch(console.error);