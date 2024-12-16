import { z } from 'zod';

// Validation schemas
export const LoginSchema = z.object({
  username: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

// Demo credentials
const DEMO_CREDENTIALS = {
  username: 'admin@villagaleon.com',
  password: 'villa123'
};

export async function loginAdmin(username: string, password: string): Promise<string> {
  // Validate credentials
  LoginSchema.parse({ username, password });
  
  // Demo authentication
  if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
    return 'demo-token';
  }
  
  throw new Error('Invalid credentials');
}