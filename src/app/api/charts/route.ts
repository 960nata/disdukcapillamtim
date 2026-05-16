import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const charts = await prisma.chart.findMany({
      include: { points: { orderBy: { year: 'asc' } } },
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(charts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch charts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const chart = await prisma.chart.create({
      data: {
        name: body.name,
        growthLabel: body.growthLabel,
        order: body.order || 0,
      }
    });
    return NextResponse.json(chart);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create chart' }, { status: 500 });
  }
}
