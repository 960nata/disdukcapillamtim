import crypto from 'crypto';
import { cookies } from 'next/headers';

const SECRET = process.env.JWT_SECRET || 'dev-secret-key-disdukcapil-lamtim-2026';

// Safety check for production at runtime
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET && typeof window === 'undefined') {
  console.warn('WARNING: JWT_SECRET is not set in production! Using fallback key.');
}

// Fungsi untuk membuat token JWT sederhana
export function signToken(payload: any): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

// Fungsi untuk memverifikasi token JWT
export function verifyToken(token: string): any {
  try {
    const [header, body, signature] = token.split('.');
    const expectedSignature = crypto.createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url');
    
    if (signature !== expectedSignature) {
      return null;
    }
    
    return JSON.parse(Buffer.from(body, 'base64url').toString());
  } catch (error) {
    return null;
  }
}

// Fungsi untuk hash password
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Fungsi untuk mengambil user yang sedang login (Hanya bisa di Server Side / API)
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch (error) {
    return null;
  }
}
