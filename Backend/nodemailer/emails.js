import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL,
} from "./emailTemplates.js";
import { nodeMailerClient, sender } from "./nodemailer.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await nodeMailerClient.sendMail({
      from: sender,
      to: email,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),

      category: "Email Verification",
    });

    console.log("Email Sent Successfully", response);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await nodeMailerClient.sendMail({
      to: email,
      from: sender,
      html: WELCOME_EMAIL.replace("{username}", name),
    });
    console.log("Email Sent Successfully", response);
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await nodeMailerClient.sendMail({
      to: email,
      from: sender,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
    console.log("Email Sent Successfully", response);
  } catch (error) {
    console.error("Error sending forgoot password email", error);
    throw new Error(`Error sending forgoot password  email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await nodeMailerClient.sendMail({
      to: email,
      sender: sender,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Email Send Successfully", response);
  } catch (error) {
    console.error("Error sending password reset success email", error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};
