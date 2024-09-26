import { createTransport } from "nodemailer";
import 'dotenv/config';

const transporter = createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS_GMAIL,
  },
});

const createMsgRegister = (first_name) =>
  `<h1>Hola ${first_name}, ¡Bienvenido/a!</h1>`;

const createMsgReset = (first_name) =>
  `<p>Hola ${first_name} Hacé click <a href="http://localhost:8080/new-pass">AQUÍ</a> 
      para restablecer tu contraseña.
      </p>`;

const createMsgInactiveAccountWarning = (first_name) =>
  `<p>Hola ${first_name},</p>
    <p>Notamos que no has iniciado sesión en un tiempo.</p>
    <p>Te recomendamos iniciar sesión cuanto antes para evitar la eliminación de tu cuenta.</p>`;

const createMsgProductDeleted = (first_name) =>
  `<p>Hola ${first_name},</p>
  <p>Tu producto ha sido eliminado.</p>`;

export const sendMail = async (user, service, token = null) => {
  try {
    const { first_name, email } = user;

    const msg =
      service === "register" ? createMsgRegister(first_name) :
        service === "resetPass" ? createMsgReset(first_name) :
          service === "inactiveAccountWarning" ? createMsgInactiveAccountWarning(first_name) :
            service === "productDeleted" ? createMsgProductDeleted(first_name) :
              "";

    const subj =
      service === "register" ? "Bienvenido/a" :
        service === "resetPass" ? "Restablecer contraseña" :
          service === "inactiveAccountWarning" ? "Advertencia de cuenta inactiva" :
            service === "productDeleted" ? "Tu producto ha sido eliminado" :
              "";

    const gmailOptions = {
      from: process.env.GMAIL,
      to: email,
      subject: subj,
      html: msg,
    };

    const response = await transporter.sendMail(gmailOptions);
    if (token) return token;
    console.log("Email enviado con éxito", response);
  } catch (error) {
    throw new Error(error);
  }
};