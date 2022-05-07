import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "62f386e17b1b19",
      pass: "0f1d96b616b569"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
        from: 'Equipe Feedget <contato@feedget.com',
        to: 'Roberto Nicolau <roberto.leonardo.2000@gmail.com>',
        subject,
        html: body,
    });
    };
}