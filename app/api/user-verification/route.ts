'use server';
import User from '@/models/api/user';
import { connectToDatabase } from '@/utils/database';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

type SendTokenProps = {
  email: string;
};

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, EMAIL } = process.env;

const OAuth2 = google.auth.OAuth2;

export const sendToken = async (values: SendTokenProps) => {
  const { email } = values;
  try {
    await connectToDatabase();
    const user = await User.findOne({ email }).select('+verifyToken');

    if (!user) {
      throw new Error('No user found or password not set.');
    }
    if (!user.verifyToken) {
      throw new Error('User is not registered or token is not set.');
    }

    const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, 'https://developers.google.com/oauthplayground');

    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: EMAIL,
        accessToken: accessToken.token
      }
    } as nodemailer.TransportOptions);

    const mailOptions = {
      from: `"You" <${EMAIL}>`,
      to: email,
      subject: 'Prompt memo - Verification Token',
      html: `<strong>Your token: ${user.verifyToken}</strong>`
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result.messageId);
  } catch (e) {
    console.log('Error sending token via email:', e);
  }
};
