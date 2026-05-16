import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const innovation = await prisma.innovation.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!innovation) {
      return NextResponse.json({ error: 'Innovation not found' }, { status: 404 });
    }
    return NextResponse.json(innovation);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch innovation' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const innovation = await prisma.innovation.update({
      where: { id: parseInt(params.id) },
      data: {
        name: body.name,
        desc: body.desc,
        status: body.status,
        url: body.url,
      },
    });
    return NextResponse.json(innovation);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update innovation' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.innovation.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: 'Innovation deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete innovation' }, { status: 500 });
  }
}
