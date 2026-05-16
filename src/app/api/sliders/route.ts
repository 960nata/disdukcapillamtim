import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sliders = await prisma.slider.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(sliders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sliders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slider = await prisma.slider.create({
      data: {
        title: body.title,
        subtitle: body.subtitle,
        imageUrl: body.imageUrl,
        link: body.link,
        order: body.order || 0,
      },
    });
    return NextResponse.json(slider);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create slider' }, { status: 500 });
  }
}
