import nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || '',
      port: Number(process.env.EMAIL_PORT) || 0,
      secure: Boolean(process.env.EMAIL_SECURE) || false,
      auth: {
        user: process.env.EMAIL_USERNAME || '',
        pass: process.env.EMAIL_PASSWORD || ''
      }
    });
  }

  public async sendEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to,
        subject,
        text
      });
    } catch (error) {
      throw new Error(`Failed to send email more info:${error}`);
    }
  }
}
