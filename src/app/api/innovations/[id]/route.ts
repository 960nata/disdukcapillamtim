import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const innovation = await prisma.innovation.findUnique({
      where: { id: parseInt(id) },
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const innovation = await prisma.innovation.update({
      where: { id: parseInt(id) },
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.innovation.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Innovation deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete innovation' }, { status: 500 });
  }
}
