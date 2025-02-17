//Nodemailer package for sending emails via Node.js
import nodemailer from "nodemailer";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import express from "express";
import cors from "cors";

//Setting up the express.js REST API
const app = express();
const port = 5001;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request body

app.listen(port, () => console.log(`🚀 Server running on port ${port}`)); //Testing to see if API is running.

//Setting up secrets Manager to add new secrets and access them in transport.
const secretsManagerClient = new SecretsManagerClient({
  region: "us-east-1", // For faster latency, cus that's the closest one I live near.
});

//Get the secret first.
const secretName = "Email_Password";

let response;

try {
  response = await secretsManagerClient.send(
    new GetSecretValueCommand({
      SecretId: secretName,
      VersionStage: "AWSCURRENT", //Default value
    })
  );
} catch (error) {
  // For a list of exceptions thrown, see
  // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  throw error;
}

const secret = JSON.parse(response.SecretString); //This is to get the secret

// Creating a transporter service for sending emails to me (the destination)!
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // or 587 for TLS
  secure: true, // true for 465, false for 587
  auth: {
    user: "nikhilsai.munagala@gmail.com",
    pass: secret["PASSWORD"],
  },
});


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: `${name}`,
    replyTo: `<${email}>`,
    to: "nikhilsai.munagala@gmail.com",
    subject: subject,
    text: message,
  };

  const testingFunc = (error, info) => {
    if (error) {
        console.error(error);
        if (!res.headersSent) { // Check if the response has already been sent
            return res.status(500).json({ message: "Failed to send email" });
        }
    } else {
        console.log("Email sent: " + info.response);
        if (!res.headersSent) { // Check if the response has already been sent
            return res.status(200).json({ message: "Email sent successfully" });
        }
    }
  };

  //Use the transporter service for sending emails.
  transporter.sendMail(mailOptions, testingFunc);
};