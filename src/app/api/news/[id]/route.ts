import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const body = await request.json();
    
    const news = await prisma.news.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        status: body.status,
        seoTitle: body.seoTitle,
        seoDesc: body.seoDesc,
        seoKeywords: body.seoKeywords,
        videoUrl: body.videoUrl,
        isCarousel: body.isCarousel,
        category: body.category,
        tags: body.tags,
        coverImage: body.coverImage,
      },
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    await prisma.news.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'News deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
