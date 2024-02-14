const nodemailer = require('nodemailer');
const { mail: mailConfig } = require('../config/settings');
const EmailService = require('../../domain/mail/emailServiceInterface');

class MailService extends EmailService {
  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
      host: mailConfig.server,
      port: mailConfig.port,
      secure: mailConfig.useSSL, 
      auth: {
        user: mailConfig.username,
        pass: mailConfig.password,
      },
    });
  }

  async sendActivationEmail(email, activationToken) {
    const message = {
      from: mailConfig.username, 
      to: email, 
      subject: 'Activa tu cuenta', 
      text: `Por favor activa tu cuenta usando el siguiente token → ${activationToken}`, 
      html: `Por favor activa tu cuenta haciendo clic en el siguiente enlace: <a href="https://${mailConfig.domain}/api/v1/users/${activationToken}/activate">Activa tu cuenta</a>`,
    };

    await this.transporter.sendMail(message);
  }
}

module.exports = MailService;