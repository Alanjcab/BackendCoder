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

  const createMsgReset = (first_name) => {
    return `<p>¡Hola ${first_name}! Hacé click <a href="http://localhost:8080/new-pass">AQUÍ</a> 
      para restablecer tu contraseña.
      </p>`;
  };

  export const sendMail = async (user, service, token = null) => {
    try {
      const { first_name, email } = user;
  
      let msg = "";
  
      service === "register"
        ? (msg = createMsgRegister(first_name))
        : service === "resetPass"
        ? (msg = createMsgReset(first_name))
        : (msg = "");
  
      let subj = "";
  
      subj =
        service === "register"
          ? "Bienvenido/a"
          : service === "resetPass"
          ? "Restablecer contraseña"
          : "";
  
      const gmailOptions = {
        from: process.env.GMAIL,
        to: email,
        subject: subj,
        html: msg,
      };
  
      const response = await transporter.sendMail(gmailOptions);
      if (token) return token;
      console.log("email enviado con exito", response);
    } catch (error) {
      throw new Error(error);
    }
  };