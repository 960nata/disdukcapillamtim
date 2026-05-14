import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const body = await request.json();
    
    const speech = await prisma.speech.update({
      where: { id },
      data: {
        name: body.name,
        title: body.title,
        quote: body.quote,
        image: body.image,
      },
    });
    return NextResponse.json(speech);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update speech' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    await prisma.speech.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Speech deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete speech' }, { status: 500 });
  }
}
