import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      include: { 
        author: {
          select: { name: true, email: true }
        } 
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // For now, if no authorId is provided, we use a fallback or fail
    if (!body.authorId) {
      const fallbackUser = await prisma.user.findFirst();
      if (!fallbackUser) {
        return NextResponse.json({ error: 'No user found to assign as author. Create a user first.' }, { status: 400 });
      }
      body.authorId = fallbackUser.id;
    }

    const news = await prisma.news.create({
      data: {
        title: body.title,
        content: body.content,
        status: body.status || 'Draft',
        authorId: body.authorId,
        seoTitle: body.seoTitle,
        seoDesc: body.seoDesc,
        seoKeywords: body.seoKeywords,
      },
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}
