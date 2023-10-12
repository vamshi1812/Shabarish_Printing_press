//jshint esversion:6
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
var path = require('path');
// Middleware for static file inclusion 
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));
const staticPath = path.join(__dirname,"../public");
app.use(express.static(staticPath));
// Main page route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/');
});

// Contact form route  
// app.post('/contact', [
//   check('email').isEmail().normalizeEmail()
// ], (req, res) => {
//   const errors = validationResult(req);
  
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
  
//   // Send email with nodemailer
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: 'bhanu0301reddy@gmail.com',
//       pass: 'iahhdsrxhuwjnayd'
//     }
//   });

//   const mailOptions = {
//     from: 'bhanu0301reddy@gmail.com',
//     to: 'bhanu0301reddy@gmail.com',
//     subject: 'New Contact Form Submission',
//     text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error sending email:', error);
//       return res.status(500).json({ error: 'Error sending email' });
//     } else {
//       console.log('Email sent:', info.response);
//       return res.status(200).json({ message: 'Form submitted successfully' });
//     }
//   });
// });
//
//
//
//const express = require('express');
const multer = require('multer');
//const nodemailer = require('nodemailer');

//const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/send-email', upload.single('attachment'), (req, res) => {
  const { name, email, message } = req.body;
  const attachment = req.file;

  // Create Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email transport settings (e.g., SMTP or sendmail)
    service: 'Gmail',
    auth: {
      user: 'bhanu0301reddy@gmail.com',
      pass: 'iahhdsrxhuwjnayd'
    }
  });

  // Compose email message
  const mailOptions = {
    from: 'bhanu0301reddy@gmail.com',
    to: 'bhanu0301reddy@gmail.com',
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    attachments: attachment ? [{ filename: attachment.originalname, path: attachment.path }] : []
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



// // Start the server
// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });
