import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const body = await request.json();
    
    const item = await prisma.structure.update({
      where: { id },
      data: {
        name: body.name,
        title: body.title,
        role: body.role,
        nip: body.nip,
        photoUrl: body.photoUrl,
        order: body.order,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update structure item' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    await prisma.structure.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Structure item deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete structure item' }, { status: 500 });
  }
}
