import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const chat = await prisma.aIChat.findUnique({
      where: { id: parseInt(id) },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!chat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }

    return NextResponse.json(chat);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch chat details' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.aIChat.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ message: 'Chat deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete chat' }, { status: 500 });
  }
}
