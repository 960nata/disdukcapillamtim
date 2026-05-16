import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    
    // Handle both chart metadata and its points
    const chart = await prisma.chart.update({
      where: { id: parseInt(id) },
      data: {
        name: body.name,
        growthLabel: body.growthLabel,
        order: body.order,
      }
    });

    // If points are provided, we replace them (simple sync strategy)
    if (body.points && Array.isArray(body.points)) {
      await prisma.chartPoint.deleteMany({ where: { chartId: parseInt(id) } });
      await prisma.chartPoint.createMany({
        data: body.points.map((p: any) => ({
          year: String(p.year),
          valueLamtim: parseFloat(p.valueLamtim),
          valueProvinsi: parseFloat(p.valueProvinsi),
          chartId: parseInt(id),
        }))
      });
    }

    return NextResponse.json(chart);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update chart' }, { status: 500 });
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
    await prisma.chart.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ message: 'Chart deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete chart' }, { status: 500 });
  }
}
