import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    
    const photo = await prisma.gallery.update({
      where: { id },
      data: {
        title: body.title,
        tags: body.tags,
        caption: body.caption,
      },
    });
    
    return NextResponse.json(photo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update photo' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    await prisma.gallery.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'Photo deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 });
  }
}
