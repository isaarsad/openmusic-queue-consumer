import nodemailer from 'nodemailer';
import config from '../src/utils/config.js';

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      secure: config.mail.port == 465,
      auth: {
        user: config.mail.user,
        pass: config.mail.password,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Openmusic Apps',
      to: targetEmail,
      subject: 'Ekspor Playlist',
      text: 'Terlampir hasil dari ekspor playlist',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

export default MailSender;
