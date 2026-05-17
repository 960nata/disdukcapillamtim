import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = "force-dynamic";

import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const body = await request.json();
    
    const updateData: any = {
      name: body.name,
      email: body.email,
      role: body.role,
      status: body.status,
      permissions: body.permissions || [],
    };

    if (body.password && body.password.trim() !== '') {
      updateData.password = hashPassword(body.password);
    }
    
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
