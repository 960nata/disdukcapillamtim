import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signToken, hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    const hashedInputPassword = hashPassword(password);
    if (user.password !== hashedInputPassword) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    if (user.status !== 'Aktif') {
      return NextResponse.json({ error: 'Akun Anda tidak aktif' }, { status: 403 });
    }

    // Buat token JWT
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({ success: true, role: user.role });
    
    // Set cookie HTTP-Only (Ketat & Aman)
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 hari
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
