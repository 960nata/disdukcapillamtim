import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const structure = await prisma.structure.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(structure);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch structure' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const item = await prisma.structure.create({
      data: {
        name: body.name,
        title: body.title,
        role: body.role,
        nip: body.nip,
        photoUrl: body.photoUrl,
        order: body.order || 0,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create structure item' }, { status: 500 });
  }
}
