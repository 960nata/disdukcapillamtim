import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(announcements);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const announcement = await prisma.announcement.create({
      data: {
        title: body.title,
        content: body.content,
        type: body.type || 'info',
        isActive: body.isActive ?? true,
      }
    });
    return NextResponse.json(announcement);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 });
  }
}
