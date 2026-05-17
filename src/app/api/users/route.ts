import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = "force-dynamic";

import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const hashedPassword = hashPassword(body.password);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role: body.role || 'Operator',
        status: body.status || 'Aktif',
        permissions: body.permissions || [],
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
