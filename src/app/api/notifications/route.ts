import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });
    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const notification = await prisma.notification.create({
      data: {
        title: body.title,
        content: body.content,
        link: body.link || null,
      }
    });
    return NextResponse.json(notification);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
  }
}
