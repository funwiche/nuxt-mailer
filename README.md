# Nuxt Mailer

Send emails from your Nuxtjs App using Nodemailer. Rich user interface to send emails and attachments.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install
```

Create a `.env` file and add the following variables:

```bash
EMAIL_ADDRESS= #Smtp Email address.
EMAIL_SECRET= #Smtp Password
### Use email from your website
```

## Development Server

Start the development server on http://localhost:3000

```bash
# yarn
yarn dev

# npm
npm run dev
```

## Send email

#### Using form

Add `enctype='multipart/form-data'` to your form

#### Using Ajax

Convert body info `new FormData` and use the code below:

```javascript
fetch("/api/meta", {
  method: "POST",
  body: formData,
})
  .then((res) => res.json())
  .then((json) => console.log(json));
```

**Note** And email wil be sent to the email address provided in the body of this request.
