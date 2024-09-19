import mailSender from "../utils/mailSender";

// import mailSender  from "../utils/mailSender";
async function sendResetPassEmail(email: string, otp: string) {
  try {
    const mailResponse = await mailSender(
      email,
      "Reset Password Email",
      `<h1>Please confirm your OTP</h1>
         <p>Here is your OTP code: ${otp}</p>`
    );
    // console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

export default sendResetPassEmail;
