import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const innovations = await prisma.innovation.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(innovations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch innovations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const innovation = await prisma.innovation.create({
      data: {
        name: body.name,
        desc: body.desc,
        status: body.status || 'Aktif',
        url: body.url,
      },
    });
    return NextResponse.json(innovation);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create innovation' }, { status: 500 });
  }
}
