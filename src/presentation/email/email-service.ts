import nodemailer from "nodemailer";
import { enviroment } from "../../config/enviroment";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log-entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

interface Attachement {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: enviroment.MAILER_SERVICE,
    auth: {
      user: enviroment.MAILER_EMAIL,
      pass: enviroment.MAILER_SECRET_KEY,
    },
  });
  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    try {
      const { to, subject, htmlBody, attachements } = options;

      const sendInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      const log = new LogEntity({
        level: LogServerityLevel.low,
        message: "Email sent",
        origin: "email-service.ts",
      });

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogServerityLevel.low,
        message: "Email was not sent",
        origin: "email-service.ts",
      });
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
    <h3>Logs del sistema - NOC</h3>
    <p> Probando 123, Probando 123, Probando 123, Probando 123. </p>
    <p>Ver logs adjuntos</p>
    `;

    const attachements: Attachement[] = [
      { filename: "logs-all.log", path: "./logs/logs-all.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
    ];

    return this.sendEmail({
      to,
      subject,
      attachements,
      htmlBody,
    });
  }
}
