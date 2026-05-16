import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const announcement = await prisma.announcement.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        content: body.content,
        type: body.type,
        isActive: body.isActive,
      }
    });
    return NextResponse.json(announcement);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update announcement' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.announcement.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ message: 'Announcement deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete announcement' }, { status: 500 });
  }
}
