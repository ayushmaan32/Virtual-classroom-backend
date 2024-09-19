import nodemailer from "nodemailer";

const mailSender = async (email: string, title: string, body: string) => {
  try {
    //create a transporter to send emails
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    //send email to users
    let info = await transporter.sendMail({
      from: "roy082171@gmail.com",
      to: email,
      subject: title,
      html: body,
    });

    // console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.error(error);
  }
};

export default mailSender;
