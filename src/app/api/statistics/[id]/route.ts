import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = "force-dynamic";
import { getCurrentUser } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const stat = await prisma.statistic.update({
      where: { id: parseInt(id) },
      data: {
        label: body.label,
        value: body.value,
        unit: body.unit,
        growth: body.growth,
        order: body.order,
      }
    });
    return NextResponse.json(stat);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update statistic' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    await prisma.statistic.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ message: 'Statistic deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete statistic' }, { status: 500 });
  }
}
