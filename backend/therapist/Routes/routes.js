const { Router } = require("express");
const controller = require("../Controllers/controllers");
const router = Router();
const nodemailer = require('nodemailer')

//Route handelling
router.get('/therapists/:id', controller.getTherapistById);
router.post("/suggesttherapist", controller.suggest_therapist);
router.post('/schedule-session', controller.schedule_session);
router.get('/therapist-sessions/:therapistId', controller.therapistSessions);
router.get('/user-sessions/:userId', controller.userSessions);
router.post('/send-confirmation-mail', async (req, res) => {
    try {
        const { userEmail, therapistName, therapistNumber, therapistEmail, startTime, endTime } = req.body;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: userEmail,
            subject: 'Successful booking of therapy session',
            html: `
                <body style="color: black;">
                <h1>Booking Confirmation</h1>
                <p>Dear User,</p>
                <p>Thank you for booking your therapy session at MindfulHeaven. Your session is confirmed.</p>
                <h2>Session Details:</h2>
                <ul>
                    <li><strong>Therapist Name:</strong> ${therapistName}</li>
                    <li><strong>Therapist Number:</strong> ${therapistNumber}</li>
                    <li><strong>Therapist Email:</strong> ${therapistEmail}</li>
                    <li><strong>Session Time:</strong> ${startTime} - ${endTime}</li>
                </ul>
                <p>You get message or call for joining information for therapy one hour before.</p>
                <p>If you have any questions or need to cancel or reschedule your session, please contact us at <a href="mailto:info@mindfulheaven.com">mindfulheaven3@gmail.com</a>.</p>
                <p>Thank you for choosing MindfulHeaven for your wellness journey.</p>
                <p>Warm regards,</p>
                <p>The MindfulHeaven Team</p>
                </body>
            `
        };
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: `A confirmation email has been sent to ${userEmail}` });
    } catch (e) {
        res.status(500).json({ err: e });
    }
});

module.exports = router;