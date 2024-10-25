const fs = require('fs');
const path = require('path');
const transporter = require('../config/transporter');

const loadTemplate = (templateName, replacements) => {
    const templatePath = path.join(__dirname, 'email_templates', `${templateName}.html`);
    let template = fs.readFileSync(templatePath, 'utf-8');

    for (let key in replacements) {
        template = template.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
    }

    return template;
}

const sendVerificationEmail = (toEmail, token, callback) => {
    const verificationUrl = `${process.env.APP_URL}verify-email?${token}`;

    const emailHtml = loadTemplate('verifyEmail', { verificationUrl });

    const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: toEmail,
        subject: 'Verify your Email',
        html: emailHtml
    };

    transporter.sendMail(mailOptions, callback);
}

module.exports = {
    sendVerificationEmail,
};