import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const stats = await prisma.statistic.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const stat = await prisma.statistic.create({
      data: {
        label: body.label,
        value: body.value,
        unit: body.unit || 'jiwa',
        growth: body.growth,
        order: body.order || 0,
      }
    });
    return NextResponse.json(stat);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create statistic' }, { status: 500 });
  }
}
