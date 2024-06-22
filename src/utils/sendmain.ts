import KoalaWelcomeEmail from "../../emails/email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailResponse {
  success: boolean;
  message: string;
}

export async function sendVerificationEmail(
  email: string,
  verificationCode: number
): Promise<EmailResponse> {
  try {
    const sendResponse = await resend.emails.send({
      from: 'emailverify <onboarding@resend.dev>',
      to: email,
      subject: 'Hello world',
      react: KoalaWelcomeEmail({ email, verificationCode }),
    });
    
    console.log('Send Response:', sendResponse);
    return { success: true, message: 'Verification email sent successfully.' };
} catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, message: 'Failed to send verification email.' };
}

}
