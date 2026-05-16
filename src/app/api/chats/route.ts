import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const chats = await prisma.aIChat.findMany({
      include: {
        _count: {
          select: { messages: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(chats);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 });
  }
}
