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
        slug: body.slug || (body.title ? body.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-') : `news-${Date.now()}`),
        content: body.content,
        status: body.status || 'Draft',
        author: { connect: { id: Number(body.authorId) } },
        seoTitle: body.seoTitle,
        seoDesc: body.seoDesc,
        seoKeywords: body.seoKeywords,
        videoUrl: body.videoUrl,
        isCarousel: body.isCarousel || false,
        category: body.category,
        tags: body.tags,
        coverImage: body.coverImage,
      },
    });

    // Auto insert images to Gallery
    try {
      const blocks = JSON.parse(body.content);
      const imageUrls: string[] = [];
      
      if (body.coverImage) imageUrls.push(body.coverImage);
      
      blocks.forEach((block: any) => {
        if (block.type === 'image' && typeof block.content === 'string') {
          imageUrls.push(block.content);
        } else if ((block.type === 'gallery' || block.type === 'carousel') && Array.isArray(block.content)) {
          imageUrls.push(...block.content);
        }
      });

      // Filter out empty or default images
      const validUrls = imageUrls.filter(url => url && !url.includes('kantor_luar.avif') && !url.includes('pelayanan_ktp.avif'));
      const uniqueUrls = [...new Set(validUrls)];

      for (const url of uniqueUrls) {
        // Check if already exists in gallery
        const exists = await prisma.gallery.findFirst({ where: { url } });
        if (!exists) {
          await prisma.gallery.create({
            data: {
              url: url,
              title: body.title,
              caption: 'Otomatis dari Berita',
            }
          });
        }
      }
    } catch (e) {
      console.error('Failed to auto-save images to gallery:', e);
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error('Failed to create news error:', error);
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}
