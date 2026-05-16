import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const speeches = await prisma.speech.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(speeches);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch speeches' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const speech = await prisma.speech.create({
      data: {
        name: body.name,
        title: body.title,
        quote: body.quote,
        image: body.image,
      },
    });
    return NextResponse.json(speech);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create speech' }, { status: 500 });
  }
}
