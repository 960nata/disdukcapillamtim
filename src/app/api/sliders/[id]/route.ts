import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const body = await request.json();
    
    const slider = await prisma.slider.update({
      where: { id },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        imageUrl: body.imageUrl,
        link: body.link,
        order: body.order,
      },
    });
    return NextResponse.json(slider);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update slider' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    await prisma.slider.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Slider deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete slider' }, { status: 500 });
  }
}
