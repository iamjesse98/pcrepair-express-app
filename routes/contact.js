var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')

router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

// send email
router.post('/send', (req, res, next) => {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'jaswanthkumar.y16@iiits.in',
      pass: ''
    }
  })
  var mailOptions = {
    from: '"JASWANTH KUMAR YADAGALLA" <jaswanthkumar.y16@iiits.in>',
    to: 'jaswanthkumar.y16@iiits.in',
    subject: 'From PC Repair',
    text: `You have a submission from... Name: ${req.body.name} Email: ${req.body.email} Message: ${req.body.message} Address: ${req.body.address}`,
    html: `<p>You have a submission from...</p>Name: ${req.body.name}<br>Email: ${req.body.email}<br>Message: ${req.body.message}<br>Address: ${req.body.address}<br>`
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.log(err)
    console.log('Message Sent:', info.response)
    res.redirect('/')
  })
})

module.exports = router;
