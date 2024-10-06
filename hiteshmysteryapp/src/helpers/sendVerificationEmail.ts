import { resend } from '@/lib/resend';
import { IApiResponse } from '@/types/ApiResponse';
import VerificationEmail from '../../emails/VerificationEmail';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
): Promise<IApiResponse> {
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Mystery meesage | Verification code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return {
      success: true,
      message: 'Verification email sent successfully',
    };
  } catch (error) {
    console.error('Error sending verification email', error);

    return {
      success: false,
      message: 'Error sending verification email',
    };
  }
}
