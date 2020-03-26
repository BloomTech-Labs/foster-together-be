const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Whole object should be stringified and stored in database.
// Admins should have a route to change emails stored for each status

const approvedEmail = member => ({
  // in production, key 'to' value should be `${member.email}`
  to: 'labs.fostertogether@gmail.com',
  from: 'connect@fostertogether.co',
  subject: 'Foster Together Application Approved!',
  html: `
  <h1>Hi ${member.first_name}!</h1>
  <h2>Thank you for applying to be a Foster Neighbor! We look forward to getting you involved.</h2>
  <p>You've already finished STEP ONE! Only two to go before you are matched with a family!. </p>

  <h2 style='font-weight:bold;'>STEP TWO: BACKGROUND CHECK</h2>
  <p>We ask that you take a quick background check with us. It takes approximately 5 minutes and costs $20.</p>
  <p>To complete, please <a href='https://app.fostertogether.co/login'>login</a> to your account and pay the fee, you will then recieve an email with further instructions from Checkr.</p>
  <p>If you have any questions or do not recieve the email, please contact us and make sure to double check your spam folder!

  <h2 style='font-weight:bold;'>STEP THREE: TRAINING</h2>
  <p>As we are not conducting any live trainings at this time, we will have you complete our online training.</p> 
  <p>To complete, please <a href='https://app.fostertogether.co/login'>login</a> to your account.</p>


  <h2>Once you complete the first two steps, you will be eligible to be matched with a family.</h2>

  <p>You can always check your status or complete any of the steps by logging into your account at: https://app.fostertogether.co/login</p>

  <p>We look forward to working with you!</p>

  <p>Thank you from all of us at Foster Together!</p> 
  `,
})

const email = async (status, member) => {
  try {
    if (status === 2) await sgMail.send(approvedEmail(member))
  } catch (err) {
    throw new Error(err.toString())
  }
}

module.exports = { email }
