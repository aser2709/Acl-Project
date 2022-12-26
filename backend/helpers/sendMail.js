const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
require("dotenv").config();


const { G_CLIENT_ID, G_CLIENT_SECRET, G_REFRESH_TOKEN} =
  process.env;

const oauth2client = new OAuth2(
  G_CLIENT_ID,
  G_CLIENT_SECRET,
  G_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);


const sendEmailReset = (to, url, text, name) => {
    oauth2client.setCredentials({
        refresh_token: G_REFRESH_TOKEN,
      });
    const accessToken = oauth2client.getAccessToken();
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        transport: {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              type: "OAuth2",
              user: 'acladm22@gmail.com',
              pass: 'Qwertyui.1',
              clientId: G_CLIENT_ID,
              clientSecret: G_CLIENT_SECRET, 
              refreshToken: G_REFRESH_TOKEN,
              accessToken,
            },
          },
      });

  const mailOptions = {
    from: "acladm22@gmail.com",
    to: to,
    subject: "RESET PASSWORD",
    html: `
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
        rel="stylesheet"
      />
      <title>Passioncorners | Account Activation</title>
      <style>
        body {
          background-color: #333333;
          height: 100vh;
          font-family: "Roboto", sans-serif;
          color: #fff;
          position: relative;
          text-align: center;
        }
        .container {
          max-width: 700px;
          width: 100%;
          height: 100%;
          margin: 0 auto;
        }
        .wrapper {
          padding: 0 15px;
        }
        .card {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }
        span {
          color: #ffc107;
        }
        button {
          padding: 1em 6em;
          border-radius: 5px;
          border: 0;
          background-color: hsl(45, 100%, 51%);
          transition: all 0.3s ease-in;
          cursor: pointer;
        }
        button:hover {
          background-color: hsl(45, 70%, 51%);
          transition: all 0.3s ease-in;
        }
        .spacing {
          margin-top: 5rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="wrapper">
          <div class="card">
            <h1><span>Hey</span> ${name}</h1>
            <p>Please click the button below to reset your password. 🙂</p>
            <a href=${url}><button>${text}</button></a>
            <p class="spacing">
              If the button above does not work, please navigate to the link
              provided below 👇🏻
            </p>
            <div>${url}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendEmailReset };