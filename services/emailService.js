require('dotenv').config()
const nodemailer = require("nodemailer");

const TOKEN = process.env.TOKEN
const ENDPOINT = process.env.ENDPOINT


const sendEmailWithBrevo = async (html, to) => {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.EMAILPORT,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.USER_NAME,
          pass: process.env.PASSWORD,
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: 'eventchat@support.com', // sender address
          to, // list of receivers
          subject: "Event Chat", // Subject line
          text: "Speaker Notification", // plain text body
          html
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      }
      
      main().catch(console.error);
}




const sendEmailWithMailtrap = async (email, subject, text) => {
    const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

    const sender = {
        email: "mailtrap@demomailtrap.com",
        name: "Mailtrap Test",
      };
      const recipients = [
        {
          email
        }
      ];
      
      client
        .send({
          from: sender,
          to: recipients,
          subject,
          text,
          category: "Integration Test",

        })
        .then(console.log, console.error);

}
            
module.exports = sendEmailWithBrevo