import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import mjml2html from "mjml";
import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import fs from "fs/promises";

console.log("EMAIL SERVICE", process.env.EMAIL_USER, process.env.EMAIL_PASSWORD);

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
<<<<<<< HEAD
      secure: true, 
=======
      secure: true,
>>>>>>> main
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

  async sendRegistrationResponsableEmail(responsibleData, token) {
    try {
      console.log(responsibleData, token);
      
      // 1. Leer la plantilla MJML
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const templatePath = path.join(
        __dirname,
        "../emailUtils/emailTemplateResponsable.mjml"
      );
      const mjmlTemplate = await fs.readFile(templatePath, "utf8");

      // 2. Compilar la plantilla con Handlebars
      const template = Handlebars.compile(mjmlTemplate);

      // 3. Reemplazar variables
      const mjmlWithData = template({
        logoUrl: "https://i.ibb.co/GWBdBcw/Olympics-removebg-preview.png",
        responsableName: responsibleData.user_name,
        registrationUrl: `${process.env.FRONTEND_URL}/user/completeResponsible/${token}`,
      });

      // 4. Convertir MJML a HTML
      const { html } = mjml2html(mjmlWithData);

      // 5. Enviar email
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: responsibleData.user_email,
        subject: "Complete su registro",
        html,
      });

      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  async sendValidationEmail(userData, token) {
    try {
      console.log("EL EMAIL SERVICE",userData, token);

      // 1. Leer la plantilla MJML
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const templatePath = path.join(
        __dirname,
        "../emailUtils/emailTemplateValidationUser.mjml"
      );
      const mjmlTemplate = await fs.readFile(templatePath, "utf8");

      // 2. Compilar la plantilla con Handlebars
      const template = Handlebars.compile(mjmlTemplate);

      // 3. Reemplazar variables
      const mjmlWithData = template({
        logoUrl: "https://i.ibb.co/GWBdBcw/Olympics-removebg-preview.png",
        userName: userData.user_name,
        registrationUrl: `${process.env.FRONTEND_URL}/user/validateUser/${token}`,
      });

      // 4. Convertir MJML a HTML
      const { html } = mjml2html(mjmlWithData);

      // 5. Enviar email
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userData.user_email,
        subject: "Valide su cuenta",
        html,
      });

      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  async sendResetPasswordEmail(userData, token) {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const templatePath = path.join(
        __dirname,
        "../emailUtils/emailTemplateResetPassword.mjml"
      );
      const mjmlTemplate = await fs.readFile(templatePath, "utf8");
      const template = Handlebars.compile(mjmlTemplate);

      const mjmlWithData = template({
        logoUrl: "https://i.ibb.co/GWBdBcw/Olympics-removebg-preview.png",
        userName: userData.user_name,
        registrationUrl: `${process.env.FRONTEND_URL}/user/resetPassword/${token}`,
      });

      const { html } = mjml2html(mjmlWithData);

      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userData.user_email,
        subject: "Restablezca su contraseña",
        html,
      });

      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  async sendContactEmail(contactData) {
    try {
      console.log(contactData);
      
      // 1. Leer la plantilla MJML
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const templatePath = path.join(
        __dirname,
        "../emailUtils/emailTemplateContact.mjml"
      );
      const mjmlTemplate = await fs.readFile(templatePath, "utf8");

      // 2. Compilar la plantilla con Handlebars
      const template = Handlebars.compile(mjmlTemplate);

      // 3. Reemplazar variables
      const mjmlWithData = template({
        logoUrl: "https://i.ibb.co/GWBdBcw/Olympics-removebg-preview.png",
        contactName: contactData.user_name,
        contactEmail: contactData.user_email,
        contactMessage: contactData.user_message        
      });

      // 4. Convertir MJML a HTML
      const { html } = mjml2html(mjmlWithData);

      // 5. Enviar email      
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Solicitud de información de ${contactData.user_name}`,
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
