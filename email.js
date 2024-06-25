const express = require('express');
const postmark = require('postmark');
const Email = require('../models/Email');  // A mongoose model for email
const router = express.Router();
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

router.post('/send', async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    const user = req.user;
    if (!user) return res.status(401).send('Unauthorized');

    await client.sendEmail({
      From: user.email,
      To: to,
      Subject: subject,
      TextBody: text
    });

    const email = new Email({ userId: user._id, to, subject, text, date: new Date() });
    await email.save();

    res.status(200).send('Email sent');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/history', async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).send('Unauthorized');

    const emails = await Email.find({ userId: user._id });
    res.status(200).json(emails);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
