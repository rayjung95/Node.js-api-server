var nodemailer = require('nodemailer')

module.exports = {
  sendInstallationEmail: function (email, openDnsUserName, openDnsPassword, qStudioUserName, qStudioPassword) {
    return new Promise((resolve, reject) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
          user: 'fakeunplugandthrive@gmail.com',
          pass: 'FakeUnplugAndThrive'
        }
      })

      // setup email data with unicode symbols
      let mailOptions = {
        from: 'fakeunplugandthrive@gmail.com', // sender address
        to: `${email}`, // list of receivers
        subject: `Information from UnPlugAndThrive`, // Subject line
        // text: "Hello world?", // plain text body
        html: ('Thank you for the installation. ' +
          '<br>Below is information on your installation:<br><br>' +
          'UserName & Password for OpenDNS<br><strong>' + openDnsUserName + '</strong>: ' +
          openDnsPassword +
          '<br>User Name & Password for QStudio<br><strong>' + qStudioUserName + '</strong>: ' +
          qStudioUserName)
      }

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(new Error({ status: 1, message: error }))
        }
        resolve({ status: 0, message: info })
      })
    })
  }
}
