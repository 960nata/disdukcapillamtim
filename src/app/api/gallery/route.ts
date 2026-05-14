import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const gallery = await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const photo = await prisma.gallery.create({
      data: {
        url: body.url,
        caption: body.caption,
      },
    });
    return NextResponse.json(photo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add photo' }, { status: 500 });
  }
}
