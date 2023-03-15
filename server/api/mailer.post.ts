import nodemailer from "nodemailer";
export default defineEventHandler(async (event) => {
  try {
    const { nodemailerConfig } = useRuntimeConfig();
    const fd = await readMultipartFormData(event);
    let body: any = fd?.find(({ name }) => name == "message")?.data;
    body = JSON.parse(body?.toString());
    let attachments = fd
      ?.filter(({ name }) => name == "attachments")
      .map((el) => ({
        filename: el.filename,
        content: el.data,
        contentType: el.type,
      }));
    const from = nodemailerConfig.auth.user;
    let transporter = nodemailer.createTransport(nodemailerConfig);
    let info = await transporter.sendMail({
      from: `"Contact Us - Nuxt.js Mailer" <${from}>`,
      to: body.email,
      subject: body.subject,
      html: message(body),
      attachments,
    });
    if (!info.messageId) throw Error();
    return [`Message sent to ${body.email}`, null];
  } catch (error) {
    console.log(error);
    return [null, "Internal server error"];
  }
});

function message(msg: any) {
  return `
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
  
        html,
        body {
          max-width: 100vw;
          overflow-x: hidden;
        }
        @media (prefers-color-scheme: dark) {
          html {
            color-scheme: dark;
          }
        }
        .container{
          max-width:420px;
          margin:0 auto;
        }
        .content{
          padding:12px 0;
          border-bottom:1px solid #818181
        }
        .label{
          font-size:14px;
          margin-bottom:4px;
          font-weight:700;
        }
      </style>
    </head>
  
    <body>
      <div class="container">
        <div class="content">
          <div class="label">Name:</div>
          <div class="body">${msg.name}</div>
        </div>
        <div class="content">
          <div class="label">Email:</div>
          <div class="body">${msg.email}</div>
        </div>
        <div class="content">
          <div class="label">Phone:</div>
          <div class="body">${msg.phone}</div>
        </div>
        <div class="content">
          <div class="label">Message:</div>
          <div class="body">${msg.body}</div>
        </div>
      </div>
    </body>
  </html>
  `;
}
