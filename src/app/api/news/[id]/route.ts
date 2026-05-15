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
