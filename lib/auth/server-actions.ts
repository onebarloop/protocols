// Now used right now. Signin is handled client side

'use server';
import { auth } from '@/lib/auth/auth';
import { getSession } from '@/lib/auth/auth';
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
    const session = await getSession();
    return { success: true, message: `Logged in as ${session?.user.name}` };
  } catch (error) {
    console.log('Login error:', error);
    return {
      success: false,
      message: 'An error occurred during login. Please try again later.',
    };
  }
}
