import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

class MailApi {
  public static async send(req: Request, res: Response) {
    const { name, contact, question, description } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.APP_GMAIL_ADDRESS,
        pass: process.env.APP_GMAIL_PASSWORD,
      },
    });
    try {
      await transporter.sendMail({
        from: process.env.APP_GMAIL_ADDRESS,
        to: process.env.APP_GMAIL_ADDRESS,
        subject: `${question} - ${name}`,
        text: `聯絡方式： ${contact}\n問題內容：\n${description}`,
      });

      return res
        .status(200)
        .send({ success: true, message: 'Send Mail successful' });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: 'Internal Server Error', success: false });
    }
  }
}

export default MailApi;
