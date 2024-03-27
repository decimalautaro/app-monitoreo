import nodemailer from "nodemailer";
import { enviroment } from "../../config/enviroment";

interface SendMailOptions {
  to: string;
  subject: string;
  htmlBody: string;
  // attachements:
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: enviroment.MAILER_SERVICE,
    auth: {
      user: enviroment.MAILER_EMAIL,
      pass: enviroment.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    try {
      const { to, subject, htmlBody } = options;

      const sendInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
      });

      console.log(sendInformation);
      return true;
    } catch (error) {
      return false;
    }
  }
}
