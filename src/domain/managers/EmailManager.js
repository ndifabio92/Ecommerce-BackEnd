import nodemailer from "nodemailer";

class EmailManager {
    constructor() {
        this.smtp_config = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false
            // auth: {
            //     user: String(config.mail.username),
            //     pass: String(config.mail.password)
            // }
        };
    }

    async send() {
        const transport = nodemailer.createTransport(this.smtp_config);
        const mailOptions = {
            from: `"From" <from@node.com>`,
            to: 'to@node.com',
            subject: 'Subject',
            html: '<div>Hellow World from Email </div>'
        };

        await transport.sendMail(mailOptions);
    }
}

export default EmailManager;