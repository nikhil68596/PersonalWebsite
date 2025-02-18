import nodemailer from "nodemailer";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// AWS Secrets Manager setup
const secretsManagerClient = new SecretsManagerClient({
  region: "us-east-1",
});

//Handling cors properly 
const corsHandler = cors({
  origin: "https://personal-website-one-psi-46.vercel.app", 
  methods: ["POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

//Retrieving the secret from my email password
const getEmailSecret = async () => {
  try {
    const response = await secretsManagerClient.send(
      new GetSecretValueCommand({
        SecretId: "Email_Password",
        VersionStage: "AWSCURRENT",
      })
    );
    return JSON.parse(response.SecretString);
  } catch (error) {
    console.error("Error retrieving secret: ", error);
    throw error;
  }
};

const createTransporter = (emailPassword) => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for 587
    auth: {
      user: "nikhilsai.munagala@gmail.com",
      pass: emailPassword,
    },
  });
};

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    corsHandler(req, res, () => {
      res.status(200).end();
    });
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, subject, message } = req.body;

  try {
    const secret = await getEmailSecret();

    const transporter = createTransporter(secret["PASSWORD"]);

    const mailOptions = {
      from: `${name}`,
      replyTo: `<${email}>`,
      to: "nikhilsai.munagala@gmail.com", 
      subject: subject,
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        return res.status(500).json({ message: "Failed to send email" });
      }
      console.log("Email sent: ", info.response);
      return res.status(200).json({ message: "Email sent successfully" });
    });
  } catch (error) {
    console.error("Failed to process the request: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}