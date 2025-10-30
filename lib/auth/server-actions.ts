// Not used right now. Signin is via auth client

'use server';
import { auth } from '@/auth/auth';
export async function login(
  prevState: { success: boolean; message: string },
  formData: FormData,
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      asResponse: true,
    });

    if (!response.ok) {
      return {
        success: false,
        message: 'Login failed. Please check your credentials.',
      };
    }
    return { success: true, message: `Logged in!` };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'An error occurred during login. Please try again later.',
    };
  }
}
