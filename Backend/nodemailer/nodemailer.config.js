import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const nodeMailerClient = new nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const sender = {
  email: "aeissa1810@gmail.com",
  name: "Ahmed Eissa",
};
