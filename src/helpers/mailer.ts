import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
export const sendMail = async ({email , emailType, userId}: any) => {
    console.log(email, emailType, userId);
    try{
        const token = await bcryptjs.hash(userId.toString(), 10);
                    if(emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: token,
                verifyTokenExpiration: Date.now() + 3600000
            });
        } else if(emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: token,
                forgotPasswordTokenExpiration: Date.now() + 3600000
            });
        }

    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: "f9411909a0b378", // should not be hardcoded
            pass: "039e9556509606" // should not be hardcoded
        }
    });

    const mailOptions = {
        from: 'akashsengar96@gmail.com',
        to: email,
        subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${token}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}</p>`
    };
    console.log('mailOptions: ', mailOptions);
    const mailResponse = await transporter.sendMail(mailOptions);
} catch (error) {
    console.error('Error sending email: ', error);
}
};