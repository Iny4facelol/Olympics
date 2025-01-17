import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import mjml2html from "mjml";
import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import fs from "fs/promises";

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendRegistrationEmail(centerData, token) {
    try {
      console.log(centerData, token);
      
      // 1. Leer la plantilla MJML
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const templatePath = path.join(
        __dirname,
        "../emailUtils/emailTemplate.mjml"
      );
      const mjmlTemplate = await fs.readFile(templatePath, "utf8");

      // 2. Compilar la plantilla con Handlebars
      const template = Handlebars.compile(mjmlTemplate);

      // 3. Reemplazar variables
      const mjmlWithData = template({
        logoUrl: "https://i.ibb.co/GWBdBcw/Olympics-removebg-preview.png",
        centerName: centerData.center_name,
        registrationUrl: `${process.env.FRONTEND_URL}/center/completeCenter/${token}`,
      });

      // 4. Convertir MJML a HTML
      const { html } = mjml2html(mjmlWithData);

      // 5. Enviar email
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: centerData.center_email,
        subject: "Complete su registro",
        html,
      });

      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
}

export default new EmailService();
